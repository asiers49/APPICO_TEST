import React from 'react';
import { Button, LinearProgress, Card, Container, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getModels, getDealers, getInventory } from '../axios';

const axios = require('axios');

class Inventory extends React.Component {
	state = {
		inventory: [],
		dealers: [],
		models: [],
		loaded: false
	};

	componentDidMount() {
		getModels().then((res) => {
			res.data.forEach((element) => {
				this.state.models.push(element);
			});
			this.setState({ loaded: true });
			console.log(this.state.models);
			getDealers().then((res) => {
				res.data.forEach((element) => {
					let dealer = {
						guid: element.guid,
						dealer: element.name
					};

					this.state.dealers.push(dealer);
				});
				this.setState({ loaded: true });
				console.log(this.state.dealers);
				getInventory().then((res) => {
					res.data.forEach((element) => {
						let inventory = {
							vin: element.vin,
							dealer: this.state.dealers.find((o) => o.guid === element.dealer).dealer,
							make: this.state.models.find((o) => o.guid === element.model).make,
							model: this.state.models.find((o) => o.guid === element.model).model1,
							type: this.state.models.find((o) => o.guid === element.model).type
						};

						console.log(inventory);
						this.state.inventory.push(inventory);
					});
					this.setState({ loaded: true });
				});
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Card style={{ margin: 8 }}>
						<CardContent>
							<Typography style={{ margin: 8, width: '65ch' }} variant="h3" id="form-dialog-title">
								Our Inventory
							</Typography>
						</CardContent>
					</Card>
					<Card style={{ margin: 8 }}>
						<CardContent>
							<Table
								style={{
									minWidth: 650
								}}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell>VIN</TableCell>
										<TableCell align="center">Dealer</TableCell>
										<TableCell align="center">Model Make</TableCell>
										<TableCell align="center">Model Name</TableCell>
										<TableCell align="center">Model Type</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.inventory.map((row) => (
										<TableRow key={row.name}>
											<TableCell component="th" scope="row">
												{row.vin}
											</TableCell>
											<TableCell align="center">{row.dealer}</TableCell>
											<TableCell align="center">{row.make}</TableCell>
											<TableCell align="center">{row.model}</TableCell>
											<TableCell align="center">{row.type}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</Container>
			</React.Fragment>
		);
	}
}

export default Inventory;
