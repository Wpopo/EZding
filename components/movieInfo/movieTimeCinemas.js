import React from 'react';
import Router from 'next/router';
import { MovieTimeCinemasWrapper , MovieTimeChoicePeopleWrapper } from '../../styled/movieInfoStyled';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';
import timeFormat from '../common/timeFormat';
import * as gtag from '../common/gtag';

class MovieTimeCinemas extends React.Component {
	constructor(props){
		super(props);

		this.cinemasDistinct = this.cinemasDistinct.bind(this);
		this.sessionChecked = this.sessionChecked.bind(this);
		this.sessionToggle = this.sessionToggle.bind(this);
		this.popUpCloseClick = this.popUpCloseClick.bind(this);
		this.peopleClick = this.peopleClick.bind(this);
		this.finalSubmit = this.finalSubmit.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.handleScroll = this.handleScroll.bind(this);

		this.state = {
			isLoading:true,
			nowData : this.props.nowData,
			cinemaList:[],
			checked:[],
			isChecked:false,
			isOnTopShow:false
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.nowData !== this.state.nowData){
			this.setState({
				isLoading:true,
				nowData:nextProps.nowData,
			},()=>{
				this.cinemasDistinct()
			});

		}
	}

	componentDidMount(){
		this.cinemasDistinct();
		window.addEventListener('scroll', this.handleScroll);
	}

	cinemasDistinct(){
		let cinemaList = new Set();

		//cinemaList
		this.props.nowData.map((item,index)=>{
			return cinemaList.add(item.cinema_name_tw);
		})
		cinemaList = Array.from(cinemaList);

		//改造cinemaList資料結構
		let newcinemalist = new Map();
		let arr = [];
		cinemaList.map((item,index)=>{
			newcinemalist.set(item,{name:item,data:[]});
		})

		//對應影城塞資料
		this.props.nowData.map((item,index)=>{
			if(newcinemalist.has(item.cinema_name_tw)){
				arr.push({
					name:item.cinema_name_tw,
					data:[{
						date:item.date,
						movie_id:item.movie_id,
						movie_name:item.movie_name,
						movie_version:item.movie_version,
						session:item.data_session,
						cinema_id:item.cinema_id
					}]
				})
			}
		})

		let fx = (result, elem) => {

			if (result[elem.name]) {
				result[elem.name]['data'] = result[elem.name]['data'].concat(elem.data)
			} else {
				result[elem.name] = JSON.parse(JSON.stringify(elem));
			}
			return result
		}

		let mergeArr = arr.reduce(fx, {})
		let resultArr = Object.values(mergeArr);

		this.setState({
			isLoading:false,
			cinemaList:resultArr,
		})

	}

	sessionToggle(index){
		let down = document.getElementsByClassName('down')[index].classList;
		let up = document.getElementsByClassName('up')[index].classList;

		document.getElementsByClassName('toggleBox')[index].classList.toggle('active');
		if(document.getElementsByClassName('toggleBox')[index].classList.contains('active')){
			down.toggle('iconActive');
			up.toggle('iconActive');
		}else{
			down.toggle('iconActive');
			up.toggle('iconActive');
		}
	}

	sessionChecked(session,ver,movieid,name,cinema,date,cinemaid){
		let checked = {session:session,version:ver,movie_id:movieid,name:name,cinema:cinema,date:date};
		sessionStorage.setItem("cinemaid",cinemaid);

		this.setState({
			isChecked:true,
			checked
		})
	}

	popUpCloseClick(){
		this.setState({
			isChecked:false,
		});
	}

	peopleClick(num){
		let checked = this.state.checked;
		checked['people'] = num;

		let items = document.getElementsByClassName('num');
		for(let i = 0 ; i < items.length ; i++){
			items[i].classList.remove('numChecked');
		}
		items[num-1].classList.add('numChecked');

		document.getElementsByClassName('submit')[0].classList.remove('submitCheck');
		document.getElementsByClassName('submit')[0].classList.add('submitCheck');

		this.setState({
			checked
		})

	}

	finalSubmit(){
		// ga埋code
		if(this.props.url.query.movieid == "0b6b405a201640ff94ad0221000a0314"){
			gtag.event("DC-8209718/wb_to0/wb_le00+standard");
			gtag.event("DC-8388319/invmedia/wb_le00+standard");
  			fbq('track', 'AddToCart', {product_id:'201901lego'});
		}

		if(this.state.checked.people){
			sessionStorage.setItem('totalSeats',this.state.checked.session.total_seats);

			Router.push({
	            pathname:'/seatMap',
	            query:{
	                session_id: this.state.checked.session.session_id,
	                tickets: this.state.checked.people,
	                movieInfo:true
	            }
	        });
		}else if(this.state.checked.people > this.state.checked.session.left_seats){
			window.alert('超過可選座位');
		}else{
			window.alert('未選擇人數');
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

	handleScroll(){
		if(document.documentElement.scrollTop > 500 || document.body.scrollTop > 500){
			this.setState({
				isOnTopShow:true
			});
		}else{
			this.setState({
				isOnTopShow:false
			});
		}
	}


	render(){
		if(this.state.isLoading){
			return(
				<MovieTimeCinemasWrapper>
					<div className="timeWrapper">
						isLoading
					</div>
				</MovieTimeCinemasWrapper>
			)
		}
		else if(this.state.cinemaList.length > 0){
			return(
				<div>
					{
						this.state.isChecked ?
						<MovieTimeChoicePeopleWrapper>
							<div className="box">
								<IoIosCloseOutline className="closeIcon" onClick={this.popUpCloseClick} />
								<div className="informationbox">
									<div className="info name">
										<div className="infoTitle">片名</div>
										<div className="infoText">{this.state.checked.name}</div>
									</div>
									<div className="info cinema">
										<div className="infoTitle">影城</div>
										<div className="infoText">{this.state.checked.cinema}</div>
									</div>
									<div className="info">
										<div className="infoTitle">日期</div>
										<div className="infoText time">{timeFormat.seatMapDate(this.state.checked.date)}</div>
									</div>
									<div className="info version">
										<div className="infoTitle">版本</div>
										<div className="infoText">{this.state.checked.version}</div>
									</div>
									<div className="info last">
										<div className="infoTitle">時間</div>
										<div className="infoText time">{timeFormat.sessionTime(this.state.checked.session.session_time)}</div>
									</div>
								</div>
								<div className="people">人數</div>
								<div className="peoplebox">
									<div className="numbox">
										<div className="num" onClick={()=>this.peopleClick(1)}>1</div>
										<div className="num" onClick={()=>this.peopleClick(2)}>2</div>
										<div className="num" onClick={()=>this.peopleClick(3)}>3</div>
										<div className="num" onClick={()=>this.peopleClick(4)}>4</div>
										<div className="num" onClick={()=>this.peopleClick(5)}>5</div>
										<div className="num" onClick={()=>this.peopleClick(6)}>6</div>
									</div>

									<div className="submit" onClick={this.finalSubmit}>確定</div>
								</div>
							</div>
							<div className="backClickWrapper" onClick={this.popUpCloseClick}></div>
						</MovieTimeChoicePeopleWrapper>
						:
						null
					}
					<MovieTimeCinemasWrapper>
					<div className="timeWrapper">
						{
							this.state.isOnTopShow ?
								<div className="gotoTop" onClick={()=>this.scrollToTop(300)}>
									<FaCaretUp className="topIcon"/>
								</div>
							:
							null
						}
						{
							this.state.cinemaList.map((item,index)=>{
								return(
									<div className="cinemabox" key={index}>
										<div className="cinemaName" onClick={()=>this.sessionToggle(index)}>{item.name}<FaCaretDown className="cinemaIcon down iconActive"/><FaCaretUp className="cinemaIcon up"/></div>
										<div className="toggleBox">
											{
												item.data.map((ver,key)=>{
													return(
														<div className="sessionBox" key={key}>
															<div className="version">{ver.movie_version}</div>
															<div className="session">
																{
																	ver.session.map((session,num)=>{
																		let time = timeFormat.sessionTime(session.session_time);
																		let status;
																		if(session.total_seats !== 0){

																			status = (session.left_seats / session.total_seats)*100;
																			if(status < 40 && status > 5){
																				status = 'yellow';
																			}else if(status <= 5){
																				status = 'red';
																			}else{
																				status = '';
																			}
																		}else{
																			status = '';
																		}
																		return(
																			<div className="time" key={num}  onClick={()=>this.sessionChecked(session,ver.movie_version,ver.movie_id,ver.movie_name.zh_tw,item.name,ver.date,ver.cinema_id)}>
																				<span className={`seats ${status}`}></span>
																				{time}
																			</div>
																		)
																	})
																}

															</div>
														</div>
													)
												})
											}
										</div>
									</div>
								)
							})
						}
					</div>
					</MovieTimeCinemasWrapper>
				</div>
			)
		}
		else{
			return(
				<MovieTimeCinemasWrapper>
					<div className="timeWrapper">

					</div>
				</MovieTimeCinemasWrapper>
			)
		}


	}
}

export default MovieTimeCinemas;
