import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import PreTitle from '../components/preferential/preTitle';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import GiftAds from '../components/common/giftAds';

class Preferential extends React.Component {

	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.deletePathOpen = this.deletePathOpen.bind(this);
		this.state = {
			visible:false,
			hide:false,
			isGiftShow: false,
			pathOpen: false,
			idOpen:''
		}

	}

	componentDidMount(){

		let group = [
			{path: 'firstbank', id: 25},
			{path: 'megabank', id: 36},
			{path: 'scbank', id: 43},
			{path: 'sinopacMOP', id: 57},
			{path: 'sinopacBT', id: 46},
			{path: 'yuantaA', id: 42},
			{path: 'yuantaB', id: 61}
		]

		for( var i=0; i<group.length; i++){
			if(this.props.url.asPath.indexOf(group[i].path)>0){
				this.setState({
					pathOpen: true,
					idOpen: group[i].id
				})
				break;
			}
		}

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

	deletePathOpen(){
		// 取消PathOpen
		this.setState({
		  pathOpen:false
	  })
	}

  	render () {

	    return (
		    <div id="scrollHide">
		    	{this.state.visible ? <UrlChange /> : null}
		    	<HeadMeta preferential={true}/>
		    	{this.state.hide ? <Navbar  url={this.props.url}/> : null}
				{this.state.isGiftShow ? <GiftAds /> : null}
		    	<PreTitle pathOpen={this.state.pathOpen} idOpen={this.state.idOpen} deletePathOpen={this.deletePathOpen}/>
		    	{this.state.hide ? <CinemaEntry /> : null}
		    	{this.state.hide ? <Footer /> : null}
		    </div>
	    )
  }
}



export default Preferential;
