import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import { HomeWrapper } from '../styled/homeStyled'
import HeadMeta from '../components/headMeta';
import UrlChange from '../components/common/urlChange';

class HOME extends React.Component {

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

    gotoOriginal=()=>{
        Router.push({
            pathname:'/index'
        });
    }

	newPage = ()=>{
		Router.push({
			pathname:'/cinema'
		});
	}

  	render () {

	    return (
            <div>
				{this.state.visible ? <UrlChange /> : null }
                <HeadMeta/>
                <HomeWrapper>
                    <a className="one" onClick={()=>this.newPage()}><img src="/static/home/a.png"/></a>
                    <a className="two" onClick={()=>this.gotoOriginal()}><img src="/static/home/b.png"/></a>
                </HomeWrapper>
            </div>
	    )
	}
}


export default HOME;
