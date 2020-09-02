import React from 'react';
import Link from 'next/link';
import { BookingWrapper , CinemaPart} from '../../styled/bookingStyled';
import { Clearfix , ChoiceLocationCinema } from '../../styled/commonStyled';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import GoDash from 'react-icons/lib/go/dash';
import GoPlus from 'react-icons/lib/go/plus';
import BookingChoiceDate from './bookingChoiceDate';
import BookingDialog from '../bookingDialog/bookingDialog';
import * as movieAPI from '../../actions/movieAPI';

class BookingTitle extends React.Component {
	constructor(props){
		super(props);

		this.dialog = this.dialog.bind(this);
		this.cinemaChoice = this.cinemaChoice.bind(this);
		this.cinemaCheck = this.cinemaCheck.bind(this);
		this.resetCinema = this.resetCinema.bind(this);
		this.rwdLoactionOpen = this.rwdLoactionOpen.bind(this);

		this.state = {
			cinema_name:this.props.booking.cinema_name.zh_tw,
			visible:false,
			isCinemaShow:false,
			movieid:this.props.query.movieid,
			cinemaid:this.props.query.cinemaid,
			location:[],
			isRwdCinemaShow:[false,false,false,false],
			cinemas:[],
		}
	}

	componentDidMount(){
		this.cinemaCheck();
	}

	//想看什麼電影 > 影城 > infoSec
	componentWillReceiveProps(nextProps){
		if(nextProps.query.cinemaid !== this.state.cinemaid || nextProps.query.movieid !== this.state.movieid){
			this.setState({
				movieid:nextProps.query.movieid,
				cinemaid:nextProps.query.cinemaid,
				cinema_name:sessionStorage.getItem('cinemaname')
			},()=>this.cinemaCheck());

		}
	}

	cinemaCheck(){

		let movie_id = this.state.movieid;

		movieAPI.getMovieCinemasList(movie_id)
		.then(result=>{

			let cinemas = [];
			let cinemaLocPart_N = [];
			let cinemaLocPart_T = [];
			let cinemaLocPart_C = [];
			let cinemaLocPart_S = [];
			let cinemasArea =[];

			result.result.forEach((item,index)=>{

				if(item.location === 1 || item.location === 8 || item.location === 11){
					item.cinema_list.map((cinema , key)=>{
						return cinemaLocPart_N.push({id:cinema.cinema_id , name:cinema.cinema_name});
					})

				}else if(item.location === 2 || item.location === 3 || item.location === 9){
					item.cinema_list.map((cinema , key)=>{
						return cinemaLocPart_T.push({id:cinema.cinema_id , name:cinema.cinema_name});
					})

				}else if(item.location === 4){
					item.cinema_list.map((cinema , key)=>{
						return cinemaLocPart_C.push({id:cinema.cinema_id , name:cinema.cinema_name});
					})

				}else if(item.location === 5 || item.location === 6 || item.location === 7 || item.location === 10){
					item.cinema_list.map((cinema , key)=>{
						return cinemaLocPart_S.push({id:cinema.cinema_id , name:cinema.cinema_name});
					})
				}
			});

			if(cinemaLocPart_N.length !== 0){
				cinemas.push(cinemaLocPart_N);
				cinemasArea.push("北區");
			}

			if(cinemaLocPart_T.length !== 0){
				cinemas.push(cinemaLocPart_T);
				cinemasArea.push("桃竹苗");
			}

			if(cinemaLocPart_C.length !== 0){
				cinemas.push(cinemaLocPart_C);
				cinemasArea.push("中區");
			}

			if(cinemaLocPart_S.length !== 0){
				cinemas.push(cinemaLocPart_S);
				cinemasArea.push("南區及離島");
			}


			this.setState({
				isLoading:false,
				location:cinemasArea,
				cinemas
			});

		})
		.catch(error=>{

			this.setState({
				isLoading:false,
				isError:true
			})
		})

	}

	dialog(){
		this.setState({
			visible:!this.state.visible,
		});

		if(this.state.visible){
			document.body.style.overflow = 'visible';
			document.body.style.position = 'initial';
			document.body.style.height = 'auto';
		}
	}

	cinemaChoice(){
		this.setState({
			isCinemaShow:!this.state.isCinemaShow
		});
	}

	resetCinema(item){
		sessionStorage.setItem('cinemaname',item.name.zh_tw);
		sessionStorage.setItem('cinemaid',item.id);

		this.setState({
			cinema_name:item.name.zh_tw,
			cinemaid:item.id,
			isCinemaShow:false,
			isRwdCinemaShow:true
		});
	}

	rwdLoactionOpen(index){

		let box = document.getElementsByClassName('box')[index].classList;
		let	title = document.getElementsByClassName('rwd-title')[index].classList;
		let isRwdCinemaShow = this.state.isRwdCinemaShow;

		if(box.contains('box-hide')){
			box.remove('box-hide');
			title.add('rwd-title-color');
			isRwdCinemaShow[index] = true;

			this.setState({
				isRwdCinemaShow
			});
		}else{
			box.add('box-hide');
			title.remove('rwd-title-color');
			isRwdCinemaShow[index] = false;
			this.setState({
				isRwdCinemaShow
			});
		}

	}

	render () {
		if(this.state.isLoading){
			return(
				<div></div>
			);
		}
		else if(this.state.cinemas){
			return (
				<div>
					{ this.state.visible ? <BookingDialog dialog={this.dialog} /> : null }
				    <BookingWrapper>
				    	<div className="wrapper">
				    		<div className="title line" onClick={this.dialog} >{this.props.booking.movie_title.zh_tw}
				    			<FaAngleDown  className="icon"/>
				    		</div>

				    		<div className="title" onClick={this.cinemaChoice}>{this.state.cinema_name}
				    			<FaAngleDown  className="icon"/>
				    		</div>
				    	</div>

				    	{this.state.isCinemaShow ?
			    			<CinemaPart toggle={this.state.isCinemaShow}>
			    				<div className="cinema-wrapper">
						    		{
						    			this.state.location.map((item,index)=>{
						    				return(
						    					<div className="loc-part"  key={index}>
						    						<h3 className="big-title">{item}</h3>
						    						<Clearfix />

						    						{

						    							this.state.cinemas[index].map((cinema,key)=>{
								    						return(
									    						<div className="cinema" onClick={()=>this.resetCinema(cinema)}key={key}>{cinema.name.zh_tw}</div>
									    					)
								    					})
						    						}
						    					</div>
						    				)
						    			})
						    		}
						    		{
						    			this.state.location.map((item,index)=>{
						    				return(
						    					<div className="rwd-loc-part"  key={index}>
						    						<h3 className="rwd-title" onClick={()=>this.rwdLoactionOpen(index)}>{item} {this.state.isRwdCinemaShow[index]? <GoDash className="icon"/>:<GoPlus className="icon"/>}</h3>
					    							<div className="box box-hide">
					    								{
					    									this.state.cinemas[index].map((cinema,key)=>{
									    						return(
										    						<div className="rwd-cinema" key={key} onClick={()=>this.resetCinema(cinema)}>{cinema.name.zh_tw}</div>
										    					)
									    					})
					    								}
					    							</div>
						    					</div>
						    				)
						    			})
						    		}
					    		</div>
			    			</CinemaPart>
			    			:
			    			null
			    		}
				    </BookingWrapper>
				    <BookingChoiceDate movieid={this.state.movieid} cinemaid={this.state.cinemaid} bookingInfo={this.props.bookingInfo}/>

			    </div>
			)
		}
		else{
			return(
				<div>isError</div>
			)
		}
	}
}



export default BookingTitle;
