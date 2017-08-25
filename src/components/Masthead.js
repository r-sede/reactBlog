import React, { Component } from 'react';


class NavLinks extends Component {

	// constructor(props) {
	// 	super(props);
	// }

	render() {
		const listLiens = this.props.navItems.map((item, index) =>
			<a className='nav-link' key={index} href={item.href}>{item.name}</a>
		);
		return (
			<nav className='nav blog-nav'>
				{ listLiens }
			</nav>
		);
	}
}

class Masthead extends Component {
	render() {
		return (
			<div className='blog-masthead'>
				<div className='container'>

						<NavLinks navItems={this.props.navItems}/>

				</div>
			</div>
		);
	}
}

export default Masthead;
