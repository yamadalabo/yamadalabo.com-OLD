import React, { Component, PropTypes } from 'react';
import Work from './Work';

export default class WorkList extends Component {

	constructor(props) {
		super(props);
		this.sortByDate = this.sortByDate.bind(this);
		this.sortByType = this.sortByType.bind(this);
	}

	sortByDate(works) {
		return works.sort((a, b) => {
			if (a.date < b.date) {
				return 1;
			} else if (a.date > b.date) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	sortByType(works) {
		const types = ['paper', 'project-paper', 'graduate-paper', 'book', 'contribution', 'speak', 'lecture', 'reward'];
		let result = [];
		types.forEach(type =>
			result = [
				...result,
				...works.filter(work => work.type === type).sort((a, b) => {
					if (a.date < b.date) {
						return 1;
					} else if (a.date > b.date) {
						return -1;
					} else {
						return 0;
					}
				})
			]
		);
		return result;
	}

	render() {
		const  { isFetching, selectedOrder, errorMessage } = this.props;
		let { works } = this.props;

		if (isFetching) {
			return (
				<div className='ui basic loading tab segment'>
				</div>
			);
		}

		if (errorMessage) {
			return (
				<div className='ui basic segment'>
					<br/>
					<br/>
					<br/>
					<br/>
					<h1 className='ui centered header'>{errorMessage}</h1>
				</div>
			);
		}

		if (works.length === 0) {
			return (
				<div className='ui basic segment'>
					<br/>
					<br/>
					<br/>
					<br/>
					<h1 className='ui centered header'>Coming soon</h1>
				</div>
			);
		}

		if (selectedOrder === 'type') {
			works = this.sortByType(works);
		} else {
			works = this.sortByDate(works);
		}

		return (
			<div className='ui basic segment'>
				<div className='ui stackable four column grid container'>
				{
					works.map((work, i) =>
						<Work
							title={work.title}
							type={work.type}
							body={work.body}
							date={work.date}
							key={i}
						/>
					)
				}
				</div>
			</div>
		);
	}
}

WorkList.propTypes = {
	works: PropTypes.array.isRequired,
	selectedOrder: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired
};
