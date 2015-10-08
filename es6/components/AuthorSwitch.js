import React, { Component, PropTypes } from 'react';

export default class AuthorSwitch extends Component {

	constructor(props) {
		super(props);
		this.localizeAuthor = this.localizeAuthor.bind(this);
	}

	localizeAuthor(author) {
		switch (author) {
			case 'professor':
				return '教授';
			case 'graduate':;
				return '院生'
			case 'undergraduate':
				return '学部生';
		}
	}

	render() {
		const { author, activeness, onClick } = this.props;

		const authorLocalized = this.localizeAuthor(author);

		return (
			<button
				className={`ui button ${activeness}`}
				onClick={onClick}>
				{authorLocalized}
			</button>
		);
	}
}

AuthorSwitch.propTypes = {
	author: PropTypes.string.isRequired,
	activeness: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
