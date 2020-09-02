import React from 'react';
import Link from 'next/link';
import { SeatMapErrorWrapper, ChoiceDateWrapper , ChoiceDateBtn } from '../../styled/bookingStyled';
import timeFormat from '../common/timeFormat';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';
import CinemabookingMovie from './cinemabookingMovie';
import Slider from 'react-slick';
import * as movieAPI from '../../actions/movieAPI';

class CinemabookingDate extends React.Component {
	constructor(props){
		super(props);

		this.getCinemaDate = this.getCinemaDate.bind(this);
		this.selectDate = this.selectDate.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);

		this.state = {
			date:[],
			checked:null,
			cinemaid:this.props.cinemainfo.cinema_id,
			isLoading: true,
			showError: false,
			settings : {
				dots: false,
				arrows:false,
				infinite: false,
				speed: 500,
				slidesToShow: 5,
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
		if(nextProps.cinemainfo.cinema_id !== this.state.cinemaid){
			this.setState({
				cinemaid:nextProps.cinemainfo.cinema_id,
				cinema_name:sessionStorage.getItem('cinemaname'),
				isLoading: true
			},()=>this.getCinemaDate());

		}
	}

	componentDidMount(){
		this.getCinemaDate();
	}

	getCinemaDate(){

		let cinema_id = this.state.cinemaid;
		let page = 1;
		let page_size = 10;

		movieAPI.getMovieListByCinema(cinema_id,page,page_size)
		.then(result=>{

			if(result.result.list.length){
				this.setState({
					date:result.result.list,
					checked:result.result.list[0],
					isLoading: false,
					showError: false
				},()=>{
					this.selectDate(result.result.list[0],0);
				});
			}else{
				this.setState({
					isLoading: false,
					showError: true
				})
			}

		})
		.catch(error=>{
			this.setState({
				isLoading: false,
				showError: true
			})
		})
	}

	selectDate(item,index){

		let checkeditems = document.getElementsByClassName('dateBox');

		for(let i=0 ; i<checkeditems.length ; i++){
			checkeditems[i].classList.remove('checked');
		}

		let checkeditem = document.getElementsByClassName('dateBox')[index].classList;
		checkeditem.add('checked');

		this.setState({
			checked:item,
		})

	}

	next(){
		this.slider.slickNext();
	}

	prev(){
		this.slider.slickPrev();
	}


  	render () {

		if(this.state.isLoading){
			return (
				<ChoiceDateWrapper>
			    	<FaCircleONotch className="loading"/>
			    </ChoiceDateWrapper>
			)
		}else if(this.state.showError){
			return (
				<SeatMapErrorWrapper cinema>
			    	<div className="errorBox">
						<div className="errorIcon"></div>
						<span className="errorText">該影城目前維護中，請晚點再試或請先選擇其他影城訂票</span>
					</div>
			    </SeatMapErrorWrapper>
			)
		}else{
			return (
		    	<div>
				    <ChoiceDateWrapper>
				    	<div className="wrapper">
				    		<ChoiceDateBtn><FaAngleLeft onClick={this.prev} className="icon"/></ChoiceDateBtn>
				    		<div className="box">

				    			<Slider {...this.state.settings} ref={c => this.slider = c }>
					    		{
					    			this.state.date.map((item,index)=>{
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
				    		{this.state.date.length > 3 ? <FaAngleRight  onClick={this.next} className="iconRWD" onClick={this.next} /> : null}
				    		<ChoiceDateBtn right><FaAngleRight onClick={this.next} className="icon"/></ChoiceDateBtn>
				    	</div>

				    </ChoiceDateWrapper>
				    <CinemabookingMovie {...this.props} date={this.state.checked}/>
				</div>
		    )
		}
  	}
}



export default CinemabookingDate;
