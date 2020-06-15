import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const background = require('./../img/background.jpg');
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			dealer: '',
			model: '',
			message: ''
		};
	}

	render() {
		return (
			<section
				style={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					height: '90vh',
					minHeight: 500,
					maxHeight: 1400,
					backgroundPosition: 'center',
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover'
				}}
			>
				<Container
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Typography
						variant="h2"
						align="center"
						component="h2"
						color="inherit"
						gutterBottom
						style={{
							color: 'white',
							marginTop: 10,
							textAlign: 'center'
						}}
					>
						Appico Test Web
					</Typography>
				</Container>
			</section>
		);
	}
}

export default Home;
