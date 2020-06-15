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
import List from '@material-ui/core/List';
import { getModels, getDealers, getSubmissions } from '../axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Submissions extends React.Component {
	state = {
		submissions: [],
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
				getSubmissions().then((res) => {
					res.data.forEach((element) => {
						let submission = {
							name: element.name,
							email: element.email,
							dealer: this.state.dealers.find((o) => o.guid === element.dealer).dealer,
							make: this.state.models.find((o) => o.guid === element.model).make,
							model: this.state.models.find((o) => o.guid === element.model).model1,
							type: this.state.models.find((o) => o.guid === element.model).type,
							text: element.message,
							created: element.created
						};

						console.log(submission);
						this.state.submissions.push(submission);
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
								Contact Submissions
							</Typography>
						</CardContent>
					</Card>
					<Card style={{ margin: 8 }}>
						<CardContent>
							<List
								style={{
									width: '100%',
									maxWidth: '100%',
									maxHeight: 400,
									overflow: 'auto'
								}}
							>
								{this.state.submissions.map((row) => (
									<ListItem>
										<ListItemText
											primary={row.name}
											secondary={
												<React.Fragment>
													<Typography component="span" variant="body2" color="textPrimary" />
													Email: {row.email}
													<br />
													<Typography component="span" variant="body2" color="textPrimary" />
													Dealer: {row.dealer}
													<br />
													<Typography component="span" variant="body2" color="textPrimary" />
													Model: {row.make} {row.model} {row.type}
													<br />
													<Typography component="span" variant="body2" color="textPrimary" />
													Created: {row.created}
													<br />
												</React.Fragment>
											}
										/>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Container>
			</React.Fragment>
		);
	}
}

export default Submissions;
