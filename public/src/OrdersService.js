import 'whatwg-fetch';
import Vue from 'vue';

const baseUrl = 'http://localhost:8000/v1';

const getByCompanyName = (companyName) =>
	fetch(`${baseUrl}/orders/company?companyName=${companyName}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
	});

  const getByAddress = (customerAddress) =>
	fetch(`${baseUrl}/orders/address?customerAddress=${customerAddress}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
	});

  const deleteById = (orderId) =>
	fetch(`${baseUrl}/order/${orderId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json'
		},
	});

  const getOccurrences = () =>
	fetch(`${baseUrl}/orders/ocurrences`, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		},
	});

	// const test = () =>
	// fetch('http://localhost:8000/v1/login', {
	// 	method: 'POST',
	// 	headers: {
	// 		Accept: 'application/json',
	// 		Content-Type: 'application/json'
	// 	},
	// 	body: JSON.stringify({
	// 		name: 'master',
	// 		account: 'password'
	// 	})
	// });

	const test = () => Vue.$http.post('http://localhost:8000/v1/login', {name :'master', account: 'password'})

export default {
	getByCompanyName,
  getByAddress,
  deleteById,
  getOccurrences,
	test
};