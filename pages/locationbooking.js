import React from 'react';
import 'isomorphic-unfetch';
import Link from 'next/link';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import LocationBookingTitle from '../components/booking/locationbookingTitle';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';

class LocationBooking extends React.Component {

	static async getInitialProps({query,req}) {
		let global1 = Object.assign({}, global.window);
		let global2 = Object.assign({}, global1.location);

		let baseUrl = req ? req.protocol+'://'+req.headers.host : global2.origin;

	    let res = await fetch(baseUrl+'/new_ezding/orders/find_location_cinema?movie_id='+query.movieid+'&location='+query.location+'&page=1&page_size=10');
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

	scrollToTop(scrollDuration) {
		var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
	        if ( window.scrollY != 0 ) {
	            window.scrollBy( 0, scrollStep );
	        }
	        else clearInterval(scrollInterval);
	    },15);
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

  	render () {

	    return (
		    <div>
		    	{this.state.visible ? <UrlChange /> : null}
		    	<HeadMeta location={this.props.movieInfo.result.booking_info.movie_title.zh_tw}/>
		    	<Navbar url={this.props.url} />
				<LocationBookingTitle booking={this.props.movieInfo.result.booking_info} query={this.props.url.query} bookingInfo={this.props.movieInfo.result}/>
				<CinemaEntry />
		    	<Footer />
		    </div>
		)
	}
}



export default LocationBooking;
