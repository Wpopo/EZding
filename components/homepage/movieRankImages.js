import React from 'react';
import Router from 'next/router';
import { MovieRankPart } from '../../styled/homePageStyled';
import ReactSlider from 'react-slick';
import LoadingCircle from '../common/loading';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaExchange from 'react-icons/lib/fa/exchange';

//error page not finished
class MovieRankImages extends React.Component {

	constructor(props){
		super(props);

		this.gotoPage = this.gotoPage.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);

		this.state = {
			isLoading:this.props.isLoading,
			isError:this.props.isError,
			movielist:this.props.movielist,
			settings:{
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 5,
				slidesToScroll: 5,
				arrows:false,
				responsive: [
					{
				        breakpoint: 1025,
				        settings: {
				          slidesToShow: 3,
				          slidesToScroll: 3,
				          arrows:false,
				          dots: true
				        }
				 	},
				 	{
				        breakpoint: 500,
				        settings: {
				          slidesToShow: 3,
				          slidesToScroll: 3,
				          infinite: true,
				          arrows:false,
				          dots: false
				        }
				 	},
				 	{
				        breakpoint: 376,
				        settings: {
				          slidesToShow: 1,
				          slidesToScroll: 1,
				          infinite: true,
				          arrows:false,
				          dots: false,
				          centerMode: true
				        }
				 	}
				]
			},
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isLoading !== this.state.isLoading){
			this.setState({
				isLoading:nextProps.isLoading,
			});
		}

		if(nextProps.isError !== this.state.isError){
			this.setState({
				isError:nextProps.isError,
			});
		}

		if(nextProps.movielist !== this.state.movielist){
			this.setState({
				movielist:nextProps.movielist,
			});
		}
	}

	gotoPage(item,val){

		Router.push({
			pathname:'/movieInfo',
			query:{
				movieid: item.movie_id,
				tab: val
			}
		});
	}

	next(){
		this.slider.slickNext();

	}

	prev(){
		this.slider.slickPrev();

	}

	render () {
		const settings = this.state.settings;

		if(this.state.isLoading){
			return(
				<MovieRankPart>
					<div className="loadingBox">
						<div className="loading"></div>
						<div className="loading"></div>
						<div className="loading"></div>
						<div className="loading"></div>
						<div className="loading"></div>
					</div>
					<div className="mobileLoadingBox">
						<div className="mobileLoading"></div>
						<div className="mobileLoading"></div>
						<div className="mobileLoading"></div>
					</div>
					<div className="phoneLoadingBox">
						<div className="phoneLoading"></div>
					</div>
				</MovieRankPart>
			)
		}
		else if(this.state.movielist){
			return (
			    <MovieRankPart>
			    	<div className="rank-post-wrapper">
			    		<ReactSlider ref={c => this.slider = c } {...settings}>
			    			{this.state.movielist.map((item,index)=>{
			    				if(index < 10){
			    					var icon ;
			    					if(item.current_ranking < item.last_ranking){
			    						icon = <FaCaretUp className="updown"/>;
			    					}else if(item.current_ranking > item.last_ranking){
			    						icon = <FaCaretDown className="updown"/>;
			    					}else if(item.current_ranking === item.last_ranking){
			    						icon = <FaExchange className="updown"/>;
			    					}
			    					return(
			    						<div key={index}>
			    						{ // if url lost
			    							item.poster_url !== null && item.poster_url !== ''?
			    							<div className="post">
					    						<div className="goToBooking">
					    							<div className="booking" onClick={()=>this.gotoPage(item,0)}>立即訂票</div>
					    							<div className="information" onClick={()=>this.gotoPage(item,1)}>電影介紹</div>
					    						</div>
					    						<div className="iconBox" onClick={()=>this.gotoPage(item,0)}><img src="../../static/common/timelist.svg" className="icon" /></div>
					    						<div className="iconBox play" onClick={()=>this.gotoPage(item,1)}><img src="../../static/common/movieInfo.svg" className="icon"/></div>
					    						{	//if page === 即將上映 ,ranking no show
					    							item.current_ranking === null ?
					    							null
					    							:
					    							<div className="rank">
						    							<div className="num">{index+1}</div>
						    							{icon}
						    						</div>
					    						}
					    						<div className="hoverPart" onClick={()=>this.gotoPage(item,0)}></div>
					    						<div className="backgroundClick" style={{ backgroundImage :`url(${item.poster_url})`}}></div>
					    					</div>
			    							:
			    							<div className="post">
			    								<div className="alt">{item.movie_title.zh_tw}</div>
			    								<div className="alt en">{item.movie_title.en_us}</div>
			    								<div className="goToBooking">
					    							<div className="booking" onClick={()=>this.gotoPage(item,0)}>立即訂票</div>
					    							<div className="information" onClick={()=>this.gotoPage(item,1)}>電影介紹</div>
					    						</div>
					    						<div className="iconBox" onClick={()=>this.gotoPage(item,0)}><img src="../../static/common/timelist.svg" className="icon" /></div>
					    						<div className="iconBox play" onClick={()=>this.gotoPage(item,1)}><img src="../../static/common/movieInfo.svg" className="icon"/></div>
			    								{	//if page === 即將上映 ,ranking no show
					    							item.current_ranking === null ?
					    							null
					    							:
					    							<div className="rank">
						    							<div className="num">{index+1}</div>
						    							{icon}
						    						</div>
					    						}
					    						<div className="hoverPart" onClick={()=>this.gotoPage(item,0)}></div>
					    						<div className="backgroundClick" style={{ backgroundImage :`url(../../static/common/poster.png)`}}></div>
			    							</div>
			    						}
				    					</div>
				    				);
			    				}

			    			})}
			    		</ReactSlider>

						<FaAngleLeft className="prev" onClick={this.prev}/>
		    			<FaAngleRight className="next" onClick={this.next}/>

			    	</div>
			    </MovieRankPart>
			)
		}
		else if(this.state.isError){
			return(
				<MovieRankPart >
					<div className="errorBox">
						<div className="errorIcon"></div>
						<div className="errorText">排名更新中</div>
					</div>
				</MovieRankPart>
			)
		}else{
			return(
				<MovieRankPart>
					<LoadingCircle height={500}/>
				</MovieRankPart>
			)
		}
	}
}



export default MovieRankImages;
