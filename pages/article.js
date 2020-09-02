import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import ArticleContent from '../components/article/articleContent';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import GiftAds from '../components/common/giftAds';

class Article extends React.Component {

	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.state = {
			visible:false,
			isGiftShow: false,
			page:this.props.url.query.page,
			type:this.props.url.query.type
		}

	}

	componentWillReceiveProps(nextProps,nextState){
		if(nextProps.url.query.page !== this.props.url.query.page){
			this.setState({
				page:nextProps.url.query.page
			})
		}
		if(nextProps.url.query.type !== this.props.url.query.type){
			this.setState({
				type:nextProps.url.query.type
			})
		}
	}

	componentDidMount(){
		this.scrollToTop(1);
		if(sessionStorage.getItem('giftAds')!=='false'){
			this.setState({
				isGiftShow: true
		    });
		}
		Router.onRouteChangeStart = url => {
		  	this.setState({
		  		visible:true
		  	})
		}
		Router.onRouteChangeComplete = url => {
		  	this.setState({
		  		visible:false
		  	})
		}
	}

	scrollToTop(scrollDuration) {
		var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
	        if ( window.scrollY != 0 ) {
	            window.scrollBy( 0, scrollStep );
	        }
	        else clearInterval(scrollInterval); 
	    },15);
	}

  	render () {

	    return (
		    <div>
		    	{this.state.visible ? <UrlChange /> : null}
		    	<HeadMeta article={true}/>
		    	<Navbar  url={this.props.url} />
				{this.state.isGiftShow ? <GiftAds /> : null}
		    	<ArticleContent url={this.props.url} type={this.state.type} page={this.state.page}/>
		    	<CinemaEntry />
		    	<Footer />
		    </div>
	    )
  }
}



export default Article;