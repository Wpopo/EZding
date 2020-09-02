import React from 'react';
import Link from 'next/link';
import { ChoiceDateWrapper , ChoiceDateBtn , Clearfix , ChoiceDateEmpty } from '../../styled/bookingStyled';
import timeFormat from '../common/timeFormat';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import BookingChoiceSession from './bookingChoiceSession';
import LocationBookingVersion from './locationbookingVersion';
import Slider from 'react-slick';

import * as movieAPI from '../../actions/movieAPI';

class BookingChoiceDate extends React.Component {
	constructor(props){
		super(props);

		this.getSessionDate = this.getSessionDate.bind(this);
		this.getAllSessionDate = this.getAllSessionDate.bind(this);
		this.selectDate = this.selectDate.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);

		this.state = {
			isNoData:false,
			movieid:this.props.movieid,
			cinemaid:this.props.cinemaid || '',
			sessionDate:[],
			checked:null,
			isCinemaEntry:false,
			location:this.props.location || '',
			settings : {
				dots: false,
				arrows:false,
				infinite: false,
				speed: 500,
				slidesToShow: 5,
				slidesToScroll: 5,
				swipeToSlide: false,
				responsive: [
				   {
				        breakpoint: 1024,
				        settings: {
				          slidesToShow: 5,
				          slidesToScroll: 5
				        }
				 	},
				 	{
				        breakpoint: 769,
				        settings: {
				          	slidesToShow: 5,
				            slidesToScroll: 5
				        }
				 	},
				 	{
				        breakpoint: 415,
				        settings: {
				          	slidesToShow: 3,
				          	slidesToScroll: 3,
				        }
				 	},
				 	{
				        breakpoint: 376,
				        settings: {
				          	slidesToShow: 3,
				          	slidesToScroll: 3,
				        }
				 	}
				]
			},
		}
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.cinemaid && nextProps.movieid){
			if(nextProps.cinemaid !== this.state.cinemaid || nextProps.movieid !== this.state.movieid){
				this.setState({
					movieid:nextProps.movieid,
					cinemaid:nextProps.cinemaid,
				},()=>{
					this.getSessionDate();
				});

			}
		}else{
			if(nextProps.movieid !== this.state.movieid || nextProps.location !== this.state.location){
				this.setState({
					movieid:nextProps.movieid,
					location:nextProps.location
				},()=>this.getAllSessionDate());
			}
		}

	}


	getSessionDate(){
		//想看什麼電影 > 影城 > dateSec
		let movie_id = this.state.movieid;
		let cinema_id = this.state.cinemaid;
		let page = 1;
		let page_size = 10;

		this.setState({
			isNoData:false
		});

		movieAPI.getMovieCinemasSessionDate(movie_id,cinema_id,page,page_size)
		.then(result=>{
			this.setState({
				sessionDate:result.result.list,
				checked:result.result.list[0]
			},()=>{
				this.selectDate(result.result.list[0],0);
			});
		})
		.catch(error=>{

		})

	}

	getAllSessionDate(){
		//想看什麼電影 > 空位 > dateSec
		this.setState({
			isNoData:false
		});

		let movie_id = this.props.movieid;
		let location = this.props.location;
		let page = 1;
		let page_size = 10;

		movieAPI.getMovieCinemasListByLocation(movie_id,location,page,page_size)
		.then(result=>{

			this.setState({
				sessionDate:result.result.list,
				checked:result.result.list[0]
			},()=>{
				this.selectDate(result.result.list[0],0);
			});
		})
		.catch(error=>{

		})
	}

	componentDidMount(){
		if(this.props.cinemaid && this.props.movieid){

			this.setState({
				sessionDate:this.props.bookingInfo.list,
				checked:this.props.bookingInfo.list[0]
			},()=>{
				this.selectDate(this.props.bookingInfo.list[0], 0);
			});

		}else{

			this.setState({
				sessionDate: this.props.bookingInfo.list,
				checked: this.props.bookingInfo.list[0]
			},()=>{
				this.selectDate(this.props.bookingInfo.list[0],0);
			});
		}

	}

	selectDate(item,index){
		let checkeditems = document.getElementsByClassName('dateBox');

		for(let i = 0 ; i < checkeditems.length ; i++){
			checkeditems[i].classList.remove('checked');
		}

		let checkeditem = document.getElementsByClassName('dateBox')[index].classList;
		checkeditem.add('checked');

		this.setState({
			checked:item
		})

	}

	next(){
		this.slider.slickNext();

	}

	prev(){
		this.slider.slickPrev();
	}


	render () {

		return (
			<div>
			    <ChoiceDateWrapper>
			    	<div className="wrapper">
			    		<ChoiceDateBtn><FaAngleLeft onClick={this.prev} className="icon"/></ChoiceDateBtn>

		    			<div className="box">
		    				<Slider {...this.state.settings} ref={c => this.slider = c }>
				    		{
				    			this.state.sessionDate.map((item,index)=>{
					    			let date = timeFormat.sessionDate(item.date ,'zh-tw');
					    			return(

					    				<div className="choiceDate"  key={index} onClick={()=>this.selectDate(item,index)}>
							    			<div className="dateBox">
								    			<div className="week">{date[0].week}</div>
								    			<div className="month-date">{date[0].date}</div>
								    			<div className="month">{date[0].month}</div>
							    			</div>
							    		</div>
					    			);
				    			})

				    		}
				    		</Slider>
		    			</div>

		    			{this.state.sessionDate.length > 3 ? <FaAngleRight  onClick={this.next} className="iconRWD" onClick={this.next} /> : null}
		    			<ChoiceDateBtn right><FaAngleRight  onClick={this.next} className="icon arrowRWD"/></ChoiceDateBtn>
			    	</div>
				    </ChoiceDateWrapper>
			    {
			    	!this.props.location ?
			    	<BookingChoiceSession sessionDate={this.state.checked}/>
			    	:
			    	<LocationBookingVersion sessionDate={this.state.checked}/>
			    }

			</div>
		)
	}
}



export default BookingChoiceDate;
