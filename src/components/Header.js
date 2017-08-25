import React, { Component } from 'react';


class Header extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='blog-header'>
				<div className='container'>
					<h1 className='blog-title'>{this.props.head.title}</h1>
					<p className='lead blog-description' >{this.props.head.blogDesc}</p>
				</div>
			</div>
		);
	}
}


export default Header;
