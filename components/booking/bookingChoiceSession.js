import React from 'react';
import Link from 'next/link';
import { BookingSessionWrapper } from '../../styled/bookingStyled';
import timeFormat from '../common/timeFormat';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';
import BookingChoicePerson from './bookingChoicePerson';
import Slider from 'react-slick';

class BookingChoiceSession extends React.Component {
	constructor(props){
		super(props);

		this.checkSession = this.checkSession.bind(this);
		this.versionClick = this.versionClick.bind(this);
		this.changeSlider = this.changeSlider.bind(this);
    	this.changeUpdateCount = this.changeUpdateCount.bind(this);

		this.state = {
			isLoading:this.props.sessionDate ? false : true,
			sessionDate:this.props.sessionDate,
			checked:null,
			version:0,
			date:'',
			slideIndex: 0,
      		updateCount: 0,
			settings:{
				dots:false,
				infinite: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				afterChange: this.changeSlider,
      			beforeChange: this.changeUpdateCount,
				speed: 500,
      			autoplay:false,
      			centerMode: true,
      			arrows:false
			},
		}
	}

	componentDidMount(){
	    if(this.state.sessionDate){
	        this.versionClick(0)
	    }
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.sessionDate !== this.state.sessionDate){
			this.setState({
				sessionDate:nextProps.sessionDate,
				date:nextProps.sessionDate.date ?  nextProps.sessionDate.date : nextProps.date,
				isLoading:false,
				version:0

			},()=>{
				let checkeditems = document.getElementsByClassName('session');
				for(let i=0 ; i<checkeditems.length ; i++){
					checkeditems[i].classList.remove('checked');
				}
				this.versionClick(this.state.version);
			});

		}
	}

	versionClick(index){
		let box = document.getElementsByClassName('version');
		for(let i = 0 ; i < box.length ; i++){
			box[i].classList.remove('add');
		}

		box[index].classList.add('add');

		this.setState({
			version:index
		},()=>{
			let checkeditems = document.getElementsByClassName('session');
			for(let i=0 ; i<checkeditems.length ; i++){
				checkeditems[i].classList.remove('checked');
			}
		})

		this.slider.slickGoTo(index);

	}

	checkSession(item,index){

		let checkeditems = document.getElementsByClassName('session');
		document.getElementById('peopleScroll').scrollIntoView({block: "start", behavior: "smooth"});

		for(let i=0 ; i<checkeditems.length ; i++){
			checkeditems[i].classList.remove('checked');
		}

		let checkeditem = document.getElementsByClassName('session')[index].classList;
		checkeditem.add('checked');

		this.setState({
			checked:item
		});

	}

	changeSlider(){
	    this.setState({
	      	slideIndex: this.slider.innerSlider.state.currentSlide
	    });

	}

	changeUpdateCount(e) {

	    this.setState({
	      updateCount: this.state.updateCount + 1
	    })
	}

	render () {

		if(this.state.isLoading){
			return (
			    <BookingSessionWrapper>
			    	<FaCircleONotch className="loading"/>
			    </BookingSessionWrapper>
			)
		}
		else if(this.state.sessionDate){
			return (
				<div>
				    <BookingSessionWrapper line={this.state.version} length={this.state.sessionDate.sdata.length}>
				    	<div className="wrapper">
				    		<div className="versionList">
				    		{
				    			this.state.sessionDate.sdata.map((item,index)=>{
				    				return <div className="version" onClick={()=>this.versionClick(index)} key={index}>{item.movie_version}</div>
								})
							}

								<div className="linebox">
					    			<div className="line"></div>
					    		</div>
							</div>


				    		<div className="versionList-rwd">
				    			<Slider {...this.state.settings} ref={c => this.slider = c}>
				    			{
					    			this.state.sessionDate.sdata.map((item,index)=>{
					    				return <div className="version" onClick={()=>this.versionClick(index)} key={index}>{item.movie_version}</div>
									})
								}
								</Slider>
							</div>

				    		<div className="part">場次</div>
				    		<div className="part">空位數</div>


				    		{
				    			this.state.sessionDate.sdata[this.state.version].data_session.map((item,index)=>{
				    				let time = timeFormat.sessionTime(item.session_time ,'zh-tw');
				    				return(
				    					<div className="session" key={index} onClick={()=>this.checkSession(item,index)}>
							    			<div className="time">{time}</div>
							    			<div className="seat">{item.left_seats}</div>
							    		</div>
				    				)
				    			})
				    		}
				    	</div>
				    	<div id="peopleScroll"></div>
				    </BookingSessionWrapper>

				    <BookingChoicePerson {...this.props} session={this.state.checked} date={this.state.date}/>
			    </div>
			)
		}

	}
}



export default BookingChoiceSession;
