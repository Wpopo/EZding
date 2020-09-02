import React from 'react';
import 'isomorphic-unfetch';
import Link from 'next/link';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import BookingTitle from '../components/booking/bookingTitle';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';

import * as movieAPI from '../actions/movieAPI';

class Booking extends React.Component {

	static async getInitialProps({ query , req }) {
	    let global1 = Object.assign({}, global.window);
		let global2 = Object.assign({}, global1.location);

		let baseUrl = req ? req.protocol+'://'+req.headers.host : global2.origin;

	    let res = await fetch(baseUrl+'/new_ezding/orders/find_movie_time?movie_id='+query.movieid+'&cinema_id='+query.cinemaid+'&page=1&page_size=50');
	    let data = await res.json()

	    return {
	    	movieInfo: data,
	    }
	}
 	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);


		this.state = {
			visible:false
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

		sessionStorage.setItem("cinemaid", this.props.url.query.cinemaid);

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
		    	<HeadMeta booking={this.props.movieInfo.result.booking_info.cinema_name.zh_tw}/>
		    	<Navbar url={this.props.url} />
		    	<BookingTitle booking={this.props.movieInfo.result.booking_info} query={this.props.url.query} bookingInfo={this.props.movieInfo.result}/>
		    	<CinemaEntry />
		    	<Footer />
		    </div>
		)
  	}


}



export default Booking;
