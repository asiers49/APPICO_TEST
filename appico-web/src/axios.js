import axios from 'axios';

export default axios.create({
	baseURL: 'https://localhost:44364/api/'
});

export function getModels() {
	return axios.get('https://localhost:44364/api/models', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
			'Content-Type': 'application/json'
		}
	});
}

export function getInventory() {
	return axios.get('https://localhost:44364/api/inventory', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
			'Content-Type': 'application/json'
		}
	});
}

export function getDealers() {
	return axios.get('https://localhost:44364/api/dealers', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
			'Content-Type': 'application/json'
		}
	});
}

export function getSubmissions() {
	return axios.get('https://localhost:44364/api/contacts', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
			'Content-Type': 'application/json'
		}
	});
}

export function postContact(contact) {
	return axios.post('https://localhost:44364/api/submit', contact, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
			'Content-Type': 'application/json'
		}
	});
}
