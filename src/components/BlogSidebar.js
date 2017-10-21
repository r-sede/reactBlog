import React, { Component } from 'react';


class BlogSidebar extends Component {



	render() {
		const socialsLinks = this.props.socialsLinks;
		const archives = this.props.archives;
		const listItems = archives.map((number) =>
		  <li><a href='#'>{number}</a></li>
		);
		return (
			<div className='col-sm-3 offset-sm-1 blog-sidebar'>
				<div className='sidebar-module sidebar-module-inset'>
					<h4>About</h4>
					<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
				</div>
				<div className='sidebar-module'>
					<h4>Archives</h4>
					<ol className='list-unstyled'>
					{listItems}
					</ol>
				</div>
				<div className='sidebar-module'>
					<h4>Elsewhere</h4>
					<ol className='list-unstyled'>
						{socialsLinks}
					</ol>
				</div>
			</div>
		);
	}
}


export default BlogSidebar;
