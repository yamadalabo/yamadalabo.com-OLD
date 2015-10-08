import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectAuthor, selectOrder, fetchWorks } from '../actions';
import WorkList from '../components/WorkList';
import AuthorSwitch from '../components/AuthorSwitch';
import OrderSwitch from '../components/OrderSwitch';

class App extends Component {
	constructor(props) {
		super(props);
		this.handleAuthorClick = this.handleAuthorClick.bind(this);
		this.handleOrderClick = this.handleOrderClick.bind(this);
	}

	componentDidMount() {
		const { dispatch, selectedAuthor } = this.props;
		dispatch(fetchWorks(selectedAuthor));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedAuthor !== this.props.selectedAuthor) {
			const { dispatch, selectedAuthor } = nextProps;
			dispatch(fetchWorks(selectedAuthor));
		}
	}

	handleAuthorClick(nextAuthor) {
		this.props.dispatch(selectAuthor(nextAuthor));
	}

	handleOrderClick(nextOrder) {
		this.props.dispatch(selectOrder(nextOrder));
	}

	render() {
		const { selectedAuthor, selectedOrder, works, isFetching, errorMessage } = this.props;
		const authors = ['professor', 'graduate', 'undergraduate'];
		const orders = ['date', 'type'];

		function renderAuthorSwitch(author, boundClick, key) {
			const activeness = (author === selectedAuthor) ? 'active' : 'not-active';
			return (
				<AuthorSwitch
					author={author}
					activeness={activeness}
					onClick={boundClick}
					key={`author-${key}`}
				 />
			);
		}

		function renderOrderSwitch(order, boundClick, key) {
			const activeness = (order === selectedOrder) ? 'active' : 'not-active';
			return (
				<OrderSwitch
					order={order}
					activeness={activeness}
					onClick={boundClick}
					key={`order-${key}`}
				/>
			);
		}

		return (
			<div className="ui stackable container">
				<div className='ui small buttons'>
					{authors.map((author, i) => {
						let boundClick = this.handleAuthorClick.bind(this, author);
						return renderAuthorSwitch(author, boundClick, i);
					})}
				</div>
				<div className='ui right floated small icon buttons'>
					{orders.map((order, i) => {
						let boundClick = this.handleOrderClick.bind(this, order);
						return renderOrderSwitch(order, boundClick, i);
					})}
				</div>
				<WorkList
					works={works}
					selectedOrder={selectedOrder}
					isFetching={isFetching}
					errorMessage={errorMessage}
				/>
			</div>
		);
	}
}

App.propTypes = {
	selectedAuthor: PropTypes.string.isRequired,
	works: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
