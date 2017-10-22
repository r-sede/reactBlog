import React, { Component } from 'react';
import Masthead from './components/Masthead';
import Header from './components/Header';
import BlogMain from './components/BlogMain';
import BlogSidebar from './components/BlogSidebar';
import BlogFooter from './components/BlogFooter';
import './blog.css';
import $ from 'jquery';
// import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '7bb6fff34ca371096fe7',
//     cluster: 'eu',
//     encrypted: true
// });

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
		

	}

	componentDidMount() {
		let self = this;
		$.ajax({
			url: 'http://127.0.0.1:8000/api/articles',
			method: 'get',
			dataType: 'json',

			success: function (data) {
				if (data.length > 0) {
					console.log(data);
					let articles = [];
					for (let i = 0; i < data.length; i++) {
						let art = data[i];
						articles.push({
							postTitle: art.articleTitle,
							postMeta: art.created_at,
							postBody: art.articleBody,
							postAuthor: art.author.name
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


		
		// Enable pusher logging - don't include this in production
		Pusher.logToConsole = true;
		// let token = document.head.querySelector('meta[name="csrf-token"]');
		var pusher = new Pusher('7bb6fff34ca371096fe7', {
		  cluster: 'eu',
		  encrypted: true
		});
		

		var channel = pusher.subscribe('my_channel');
		
			channel.bind('App\\Events\\UpdateBlogEvent', function(data) {
				console.log(data.article);
				self.state.articles.unshift ({
					postTitle: data.article.articleTitle,
					postMeta: data.article.created_at,
					postBody: data.article.articleBody,
					postAuthor: data.authorName
				})
				self.setState({article: self.state.articles});
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
