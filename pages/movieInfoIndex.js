import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import MovieInfoContent from '../components/movieInfo/movieInfoContent';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import GiftAds from '../components/common/giftAds';
class MovieInfoIndex extends React.Component {

	constructor(props){
		super(props);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.state = {
			visible:false,
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

  	render () {

	    return (
		    <div>
		    	{this.state.visible ? <UrlChange /> : null}
		    	<HeadMeta movieInfoIndex={true}/>
		    	<Navbar url={this.props.url} />
				{this.state.isGiftShow ? <GiftAds /> : null}
		    	<MovieInfoContent />
		    	<CinemaEntry />
		    	<Footer />
		    </div>
	    )
  }
}



export default MovieInfoIndex;