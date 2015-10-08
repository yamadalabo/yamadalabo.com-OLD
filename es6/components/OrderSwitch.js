import React, { Component, PropTypes } from 'react';

export default class OrderSwitch {
	render (){
		const { order, activeness, onClick } = this.props;

		const type = order === 'type' ? 'tags' : 'calendar'

		return (
			<button
				className={`ui button ${activeness}`}
				onClick={onClick}>
				<i className={`${type} icon`}></i>
			</button>
		);
	}
}

OrderSwitch.propTypes = {
	order: PropTypes.string.isRequired,
	activeness: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
