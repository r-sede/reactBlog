import React, { Component } from 'react';


class BlogMain extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cursor: 0,
			maxArticle: 10
		};
	}

	render() {
		const articles = this.props.articles;

		const articleToDraw = [];
		let upBounds = Math.min(articles.length, this.state.cursor + this.state.maxArticle);
		console.log(upBounds);
		for (let i = this.state.cursor; i < upBounds; i++) {
			let dangerHtml = { __html: articles[i].postBody };
			articleToDraw.push(
				<div key={'blogPost' + i} className='blog-post'>
					<h2 key={'blogPostTitle' + i} className='blog-post-title'>{articles[i].postTitle}</h2>
					<p key={'blogPostMeta' + i} className='blog-post-meta'>{articles[i].postMeta}
						<a href='#'> Mark</a>
					</p>
					<div dangerouslySetInnerHTML={dangerHtml}/>
				</div>
			);
		}


		return (
			<div className='col-sm-8 blog-main'>
				{articleToDraw}
				  <nav className='blog-pagination'>
	          <a className='btn btn-outline-primary' href='#'>Older</a>
	          <a className='btn btn-outline-secondary disabled' href='#'>Newer</a>
          </nav>
			</div>
		);
	}
}


export default BlogMain;
