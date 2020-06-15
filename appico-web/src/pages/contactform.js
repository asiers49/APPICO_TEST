import React from 'react';
import { Formik, Form, Field, useField } from 'formik';
import { Button, LinearProgress, Card, Container, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { object, string, boolean } from 'yup';
import { postContact, getModels, getDealers } from '../axios';

const axios = require('axios');

var Loader = require('react-loader');

class ContactForm extends React.Component {
	state = {
		models: [],
		dealers: [],
		loaded: false
	};

	componentDidMount() {
		getModels().then((res) => {
			var data;
			res.data.forEach((element) => {
				let model = {
					value: element.guid,
					label: element.make.concat(' ', element.model1, ' ', element.type, ' ', element.year)
				};

				this.state.models.push(model);
			});
			this.setState({ loaded: true });
			console.log(this.state.models);
		});

		getDealers().then((res) => {
			var data;
			res.data.forEach((element) => {
				let dealer = {
					value: element.guid,
					label: element.name
				};

				this.state.dealers.push(dealer);
			});
			this.setState({ loaded: true });
			console.log(this.state.dealers);
		});
	}

	render() {
		return (
			<React.Fragment>
				<Container>
					<Card>
						<CardContent>
							<Typography style={{ margin: 8, width: '65ch' }} variant="h3" id="form-dialog-title">
								Contact us!
							</Typography>
						</CardContent>
					</Card>
					<Card>
						<CardContent>
							<Formik
								initialValues={{
									name: '',
									email: '',
									model: '',
									dealer: '',
									message: '',
									ToS: false
								}}
								validationSchema={object({
									name: string().required('Required').max(200),
									email: string().email().required('Required').max(250),
									ToS: boolean().required('Required').oneOf([ true ]),
									message: string().max(4000)
								})}
								onSubmit={(values, { setSubmitting }) => {
									setTimeout(() => {
										delete values.ToS;
										setSubmitting(false);
										//alert(JSON.stringify(values, null, 2));
										postContact(values);
									}, 500);
								}}
							>
								{({ values, errors, submitForm, isSubmitting }) => (
									<Form>
										{/* 										<pre>{JSON.stringify(values, null, 4)}</pre>
 */}{' '}
										<Field
											component={TextField}
											name="name"
											type="name"
											label="Name"
											fullWidth
											required
											style={{ margin: 8 }}
										/>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email"
											fullWidth
											style={{ margin: 8 }}
										/>
										<Field
											component={TextField}
											select
											name="dealer"
											label="Dealer"
											fullWidth
											margin="dense"
											style={{ margin: 8, width: '65ch' }}
										>
											{this.state.dealers.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Field>
										<Field
											component={TextField}
											select
											name="model"
											label="Models"
											fullWidth
											margin="dense"
											style={{ margin: 8, width: '65ch' }}
										>
											{this.state.models.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</Field>
										<Field
											component={TextField}
											name="message"
											label="Message"
											fullWidth
											multiline
											rows={3}
											rowsMax={3}
											style={{ margin: 8 }}
										/>
										<Divider />
										<MyCheckbox
											style={{ margin: 8 }}
											name="ToS"
											label="Accept Terms and Conditions"
										/>
										<Button
											variant="contained"
											color="primary"
											style={{ margin: 8 }}
											disabled={isSubmitting}
											onClick={submitForm}
										>
											Submit
										</Button>
										{isSubmitting && <LinearProgress />}
									</Form>
								)}
							</Formik>
						</CardContent>
					</Card>
				</Container>
			</React.Fragment>
		);
	}
}

function MyCheckbox(props) {
	const [ field ] = useField({
		name: props.name,
		type: 'checkbox',
		value: props.value
	});

	return <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />;
}

export default ContactForm;
