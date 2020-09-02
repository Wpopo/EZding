import React from 'react';
import Link from 'next/link';
import { BookingWrapper , CinemaPart} from '../../styled/bookingStyled';
import { Clearfix , ChoiceLocationCinema } from '../../styled/commonStyled';
import BookingChoiceDate from './bookingChoiceDate';
import BookingDialog from '../bookingDialog/bookingDialog';
import FaAngleDown from 'react-icons/lib/fa/angle-down';

import * as movieAPI from '../../actions/movieAPI';

class LocationBookingTitle extends React.Component {
	constructor(props){
		super(props);

		this.dialog = this.dialog.bind(this);
		this.getMovieCinemasList = this.getMovieCinemasList.bind(this);
		this.locationShow = this.locationShow.bind(this);
		this.choiceLocation = this.choiceLocation.bind(this);

		this.state = {
			movieid:this.props.query.movieid,
			visible: false,
			location : this.props.query.location,
			isLocationShow : false,
			emptyPartSample:[
				{ location : '台北' , num : 1 },
				{ location : '桃園' , num : 2 },
				{ location : '新竹' , num : 3 },
				{ location : '台中' , num : 4 },
				{ location : '台南' , num : 5 },
				{ location : '高雄' , num : 6 },
				{ location : '屏東' , num : 7 },
				{ location : '宜蘭' , num : 8 },
				{ location : '苗栗' , num : 9 },
				{ location : '澎湖', num : 10 },
				{ location : '花蓮', num : 11 },
			],
			emptyPart:[],

		}

	}
	//想看什麼電影 > 空位 > infoSec
	componentWillReceiveProps(nextProps){
		if(nextProps.query.location !== this.state.location || nextProps.query.movieid !== this.state.movieid ){
			this.setState({
				movieid:nextProps.query.movieid,
				location:nextProps.query.location,
				cinema_name:sessionStorage.getItem('cinemaname')
			},()=>{
				this.getMovieCinemasList();
			});

		}
	}

	dialog(){
		this.setState({
			visible:!this.state.visible
		});
		if(this.state.visible){
			document.body.style.overflow = 'visible';
			document.body.style.position = 'initial';
			document.body.style.height = 'auto';
		}
	}

	componentDidMount(){
		this.getMovieCinemasList();
	}

	getMovieCinemasList(){
		let movie_id = this.state.movieid;

		movieAPI.getMovieCinemasList(movie_id)
		.then(result=>{

			this.setState({
				emptyPart:result.result
			});
		})
		.catch(error=>{

		})
	}


	locationShow(){
		this.setState({
			isLocationShow: !this.state.isLocationShow
		});

	}

	choiceLocation(num){
		this.setState({
			location:num,
			isLocationShow:false
		});
	}

  	render () {

	    return (
	    	<div>
				{ this.state.visible ? <BookingDialog dialog={this.dialog} /> : null }
			    <BookingWrapper>
			    	<div className="wrapper">
			    		<div className="title line" onClick={this.dialog} >{this.props.booking.movie_title.zh_tw}
			    			<FaAngleDown  className="icon"/>
			    		</div>

			    		<div className="title" onClick={this.locationShow}>
			    		{
			    			this.state.emptyPartSample.map((item,index)=>{
			    				if(item.num == this.state.location){
			    					return (
			    						item.location
			    					)
			    				}
			    			})
			    		}
			    			<FaAngleDown  className="icon"/>
			    		</div>
				    </div>

				    {
				    	this.state.isLocationShow ?
		    			<CinemaPart toggle={this.state.isLocationShow} location>
		    				<div className="cinema-wrapper">
					    		{
					    			this.state.emptyPart.map((item,index)=>{
					    				return (
					    					this.state.emptyPartSample.map((loc,key)=>{
						    					if(item.location == loc.num){
						    						return(
								    					<div className="location" key={index} onClick={()=>this.choiceLocation(loc.num)}>{loc.location}</div>
								    				)
						    					}
					    					})
					    				)

					    			})
					    		}
				    		</div>
		    			</CinemaPart>
			    		:
			    		null
			    	}
			    </BookingWrapper>

			    <BookingChoiceDate movieid={this.state.movieid} location={this.state.location} bookingInfo={this.props.bookingInfo}/>
			</div>
	    )
  	}
}



export default LocationBookingTitle;
