import { Schema, arrayOf, normalize } from 'normalizr';
import 'isomorphic-fetch';

const API_ROOT = 'http://api.tumblr.com/v2/blog/yamadalab-test.tumblr.com/posts?tag=works&tag=professor';

function callApi(endpoint) {
	const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ?
		API_ROOT + endpoint : endpoint;

	return fetch(fullUrl)
		.then(response =>{
			console.log(response);
			return response.json();
		})
		.then(json =>
			console.log('parsed json', json.response.posts)
		);
}

callApi('');
