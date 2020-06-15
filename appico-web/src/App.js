import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, NavLink } from 'react-router-dom';
import Inventory from './pages/inventory';
import ContactForm from './pages/contactform';
import Submissions from './pages/submissions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Home from './pages/home';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	lists: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(1)
	}
}));

const breadcrumbNameMap = {
	'/contact': 'Contact',
	'/inventory': 'Inventory',
	'/submissions': 'Submissions',
	'/home': 'Home'
};

function ListItemLink(props) {
	const { to, open, ...other } = props;
	const primary = breadcrumbNameMap[to];

	return (
		<li>
			<ListItem button component={RouterLink} to={to} {...other}>
				<ListItemText primary={primary} />
				{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
			</ListItem>
		</li>
	);
}

ListItemLink.propTypes = {
	open: PropTypes.bool,
	to: PropTypes.string.isRequired
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

function App() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<MemoryRouter initialEntries={[ '/home' ]} initialIndex={0}>
				<div className={classes.root}>
					<AppBar position="static">
						<Toolbar>
							<Typography variant="h4" className={classes.title}>
								Appico Web
							</Typography>
							<ListItemLink to="/home" />
							<ListItemLink to="/contact" />
							<ListItemLink to="/inventory" />
							<ListItemLink to="/submissions" />
						</Toolbar>
					</AppBar>
				</div>

				<Route>
					{({ location }) => {
						const pathnames = location.pathname.split('/').filter((x) => x);

						return (
							<Breadcrumbs aria-label="breadcrumb">
								<LinkRouter color="inherit" to="/">
									Home
								</LinkRouter>
								{pathnames.map((value, index) => {
									const last = index === pathnames.length - 1;
									const to = `/${pathnames.slice(0, index + 1).join('/')}`;

									return last ? (
										<Typography color="textPrimary" key={to}>
											{breadcrumbNameMap[to]}
										</Typography>
									) : (
										<LinkRouter color="inherit" to={to} key={to}>
											{breadcrumbNameMap[to]}
										</LinkRouter>
									);
								})}
							</Breadcrumbs>
						);
					}}
				</Route>
				<div>
					<Switch>
						<Route exact path="/contact" component={ContactForm} />
						<Route path="/inventory" component={Inventory} />
						<Route path="/submissions" component={Submissions} />
						<Route path="/home" component={Home} />
					</Switch>
				</div>
			</MemoryRouter>
		</React.Fragment>
	);
}

export default App;
