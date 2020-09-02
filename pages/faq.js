import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import FAQContent from '../components/faq/faqContent';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import GiftAds from '../components/common/giftAds';

class FAQ extends React.Component {

	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.state = {
			visible:false,
			hide:false,
			isGiftShow: false
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
		if(Router.router.query.device !== "app"){
			this.setState({
		  		hide:true
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
		    <div id="scrollHideFaq">
		    	{this.state.visible ? <UrlChange /> : null}
		    	<HeadMeta faq={true}/>
		    	{this.state.hide ? <Navbar url={this.props.url} /> : null}
				{this.state.isGiftShow ? <GiftAds /> : null}
		    	<FAQContent />
		    	{this.state.hide ? <CinemaEntry /> : null}
		    	{this.state.hide ? <Footer /> : null}
		    </div>
	    )
	}
}


export default FAQ;
