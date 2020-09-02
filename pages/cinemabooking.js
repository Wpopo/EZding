import React from 'react';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import CinemabookingTitle from '../components/booking/cinemabookingTitle';
import CinemabookingDate from '../components/booking/cinemabookingDate';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';

import * as movieAPI from '../actions/movieAPI';

class Cinemabooking extends React.Component {
	static async getInitialProps({ query , req }) { 
		let global1 = Object.assign({}, global.window);
		let global2 = Object.assign({}, global1.location);

		let baseUrl = req ? req.protocol+'://'+req.headers.host : global2.origin;
	    let res = await fetch(baseUrl+'/new_ezding/cinemas/'+query.cinemaid);
	    let data = await res.json()

	    return {
	      	cinemainfo:data
	    }
	}
	
	constructor(props){
		super(props);

		this.scrollToTop = this.scrollToTop.bind(this);
		this.state = {
			visible:false,
			cinemainfo:this.props.cinemainfo.result
		}

	}
	componentWillReceiveProps(nextProps){
		if(nextProps.cinemainfo.result.cinema_id !== this.state.cinemainfo.cinema_id){
			this.setState({
				cinemainfo:nextProps.cinemainfo.result
			},()=>this.scrollToTop(1));

		}
	}

	componentDidMount(){
		this.scrollToTop(1);
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
				<HeadMeta cinemaEntry cinemainfo={this.props.cinemainfo.result}/>
			    <Navbar url={this.props.url}/>
			    <CinemabookingTitle cinemainfo={this.props.cinemainfo.result}/>
			    <CinemabookingDate cinemainfo={this.props.cinemainfo.result}/>
			    <CinemaEntry />
			    <Footer />
		    </div>
		)
		
	}
}



export default Cinemabooking;