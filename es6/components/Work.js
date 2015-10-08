import React, { Component, PropTypes } from 'react';

export default class Work extends Component {
	render() {
		const { title, type, body, date } = this.props;

		const dateString = date.year() + '-' + (date.month() + 1);

		const htmlString = {
			__html: body
		};

		function selectColor(type) {
			switch (type) {
				case 'paper':
					return 'teal';
				case 'book':
					return 'yellow';
				case 'contribution':
					return 'olive';
				case 'speak':
					return 'violet';
				case 'lecture':
					return 'pink';
				case 'reward':
					return 'red';
				case 'project-paper':
					return 'teal';
				case 'graduate-paper':
					return 'orange';
				default:
					return 'teal';
			}
		}

		function selectIcon(type) {
			switch (type) {
				case 'paper':
					return 'file text outline';
				case 'book':
					return 'book';
				case 'contribution':
					return 'write';
				case 'speak':
					return 'announcement';
				case 'lecture':
					return 'student';
				case 'reward':
					return 'star';
				case 'project-paper':
					return 'file text outline';
				case 'graduate-paper':
					return 'file text outline';
				default:
					return 'file text outline';
			}
		}

		return (
			<div className='column'>
				<div className=' ui centered card'>
					<div className='content'>
						<div className='header'>{title}</div>
					</div>
					<div className='content'>
						<div className='description'
								 dangerouslySetInnerHTML={htmlString}	/>
					</div>
					<div className='extra content'>
						<div className="right floated meta">
							<span className="date">{dateString}</span>
						</div>
						<div className={`ui ${selectColor(type)} basic label`}>
							<i className={selectIcon(type) + ' icon'}></i>{type}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Work.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	date: PropTypes.object.isRequired
};
