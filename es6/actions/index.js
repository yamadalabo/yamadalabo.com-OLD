import 'babel-core/polyfill';
import fetchJsonp from 'fetch-jsonp';
import moment from 'moment';

export const SELECT_AUTHOR = 'SELECT_AUTHOR';
export function selectAuthor(author) {
	return {
		type: SELECT_AUTHOR,
		author
	};
};

export const SELECT_ORDER = 'SELECT_ORDER';
export function selectOrder(order) {
	return {
		type: SELECT_ORDER,
		order
	};
};

export const REQUEST_WORKS_START = 'REQUEST_WORKS_START';
function requestWorksStart() {
	return {
		type: REQUEST_WORKS_START,
	};
};

export const REQUEST_WORKS_SUCCESS = 'REQUEST_WORKS_SUCCESS';

function requestWorksSuccess(works) {
	return {
		type: REQUEST_WORKS_SUCCESS,
		works
	};
};

export const REQUEST_WORKS_FAILED = 'REQUEST_WORKS_FAILED';

function requestWorksFailed(error) {
	return {
		type: REQUEST_WORKS_FAILED,
		error
	}
}

export function fetchWorks(author) {
	return (dispatch, getStore) => {
		dispatch(requestWorksStart());

		const API_ROOT = 'http://api.tumblr.com/v2/blog/yamadalab-ocu.tumblr.com/posts';
		fetchJsonp(API_ROOT + `?tag=works&tag=${author}`)
			.then(response =>
				response.json()
			)
			.then(json => {
				const { posts } = json.response;
				let works = [];

				function validateItem({ title, type, body, date }) {
					if (title === '' || title === undefined || title === null) {
						title = '無題';
					}
					if (type === undefined) {
						type = 'thesis'
					}
					return { title, type, body, date };
				}

				const WORK_TYPES = ['paper', 'book', 'contribution', 'speak', 'lecture', 'reward', 'project-paper', 'graduate-paper'];

				posts.forEach(post => {
					let { title, body, timestamp, tags } = post;
					const specifiedDate = tags.find(tag => tag.match(/^date-/));
					let date;
					if (specifiedDate) {
						const [years, months = 1] = specifiedDate.replace(/^date-/, '').split(/-/);
						date = moment({years, months: months -1});
					} else {
						date = moment.unix(timestamp);
					}

					let type;
					WORK_TYPES.forEach(t => {
						const result = tags.find(tag => tag === t);
						if (result) {
							type = result;
						}
					});
					works = [...works, validateItem({ title, type, body, date })];
				});

				dispatch(requestWorksSuccess(works));
			}).catch(error =>
				dispatch(requestWorksFailed(error))
			);
	}
}
