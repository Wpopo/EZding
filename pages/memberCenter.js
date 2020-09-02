import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import GiftAds from '../components/common/giftAds';
import MemberContent from '../components/member/memberContent'


class MemberCenter extends React.Component {

	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.alertShow = this.alertShow.bind(this);
		this.state = {
			visible:false,
			isAlertShow:true,
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

	alertShow(boolean){
		if(this.state.isAlertShow){
			this.setState({
				isAlertShow:false
			},()=>{
				alert('請重新登入');
				Router.push('/');
			})
			
		}
	}	
	
	
	
	render () {


		return (
		    <div>
		    	{this.state.visible ? <UrlChange /> : null }
		    	<HeadMeta memberCenter={true}/>
		    	<Navbar  url={this.props.url}/>
				{/* {this.state.isGiftShow ? <GiftAds /> : null} */}
		    	<MemberContent url={this.props.url} alertShow={this.alertShow}/>
		    	<CinemaEntry />
		    	<Footer />
		    </div>
    	)
		
	    
  }
}

export default MemberCenter;