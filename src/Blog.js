import React, { Component } from 'react';
import Masthead from './components/Masthead';
import Header from './components/Header';
import BlogMain from './components/BlogMain';
import BlogSidebar from './components/BlogSidebar';
import BlogFooter from './components/BlogFooter';
import './blog.css';
import $ from 'jquery';

class Blog extends Component {

	constructor(props) {
		super(props);
		this.menu = [
			{ href: '#', name: 'Home' },
			{ href: '#', name: 'New features' },
			{ href: '#', name: 'Press' },
			{ href: '#', name: 'New Hire' },
			{ href: '#', name: 'Genial de ouf' },
			{ href: '#', name: 'About' }
		];

		this.headerObj = { title: 'le titre', blogDesc: 'la description du blog' };


		this.state = { articles: [], archives: [] };
		let self = this;
		$.ajax({
			url: 'http://127.0.0.1:8000/api/articles',
			method: 'get',
			dataType: 'json',

			success: function (data) {
				if (data.length > 0) {
					let articles = [];
					for (let i = 0; i < data.length; i++) {
						let art = data[i];
						articles.push({
							postTitle: art.articleTitle,
							postMeta: art.created_at,
							postBody: art.articleBody
						});
					}
					self.setState({ articles: articles });
				}
			}
		});

		$.ajax({
			url: 'http://127.0.0.1:8000/api/months',
			method: 'get',
			dataType: 'json',

			success: function (data) {
				console.log(data);
				if (data.length > 0) {
					let archives = [];
					for (let i = 0; i < data.length; i++) {
						archives.push(data[i]);
					}
					self.setState({ archives: archives });
				}
			}
		});
	}

	render() {
		return (
			<div>
				<Masthead navItems={this.menu}/>
				<Header head={this.headerObj} />
				<div className='container'>
					<div className='row' >
						<BlogMain articles={this.state.articles}/>
						<BlogSidebar archives={this.state.archives} socialsLinks={this.socialsLinks}/>
					</div>
				</div>
				<BlogFooter />

			</div>
		);
	}
}

export default Blog;
