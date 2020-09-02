import React from 'react';
import Link from 'next/link';
import { LocationWrapper ,Clearfix} from '../../styled/bookingStyled';
import timeFormat from '../common/timeFormat';
import BookingChoicePerson from './bookingChoicePerson';
import Slider from 'react-slick';


class LocationBookingVersion extends React.Component {
	constructor(props){
		super(props);

		this.selectVersion = this.selectVersion.bind(this);
		this.selectSession = this.selectSession.bind(this);
		this.handleSession = this.handleSession.bind(this);
		this.changeSlider = this.changeSlider.bind(this);
    	this.changeUpdateCount = this.changeUpdateCount.bind(this);

		this.state = {
			sessionDate:this.props.sessionDate,
			renderVersion:[''],
			renderSession:[],
			index:0,
			line:0,
			checked:'',
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

	componentWillReceiveProps(nextProps){
		if(nextProps.sessionDate !== this.state.sessionDate){
			this.setState({
				sessionDate:nextProps.sessionDate
			},()=>{
				//if this movie is not in theater now
				this.state.sessionDate === undefined ? null : this.handleSession();

			})
		}
	}

	componentDidMount(){
		this.selectVersion(this.state.renderVersion[0],0,0);
	}

	selectVersion(ver,num,index,check,rwd){
		// ver = version
		// num = width of bottom line
		// index = key
		// check = not first render
		// rwd =  1 => web  2=>rwd

		this.setState({
			index,
			line:num
		});

		let list = document.getElementsByClassName('list');

		for(let i = 0 ; i < list.length ; i++){
			list[i].classList.remove('add');
		}
		list[index].classList.add('add');

		if(check){
			this.handleSession(ver,check);

		}
		if(rwd == 2){
			this.slider.slickGoTo(index);
		}

	}

	handleSession(ver,check){

		let sdata = this.state.sessionDate.sdata;

		let renderVersion = [];
		let renderSession = [];

		//movie version handle
		sdata.map((item,key)=>{
			if(renderVersion.indexOf(item.movie_version) === -1){
				return renderVersion.push(item.movie_version);
			}
		})

		ver = ver || renderVersion[0];

		// var order = ["數位", "旗艦大廳", "數位(中)", "數位(法)", "3D", "3D(中)", "3D(法)", "3DPLUS", "3DPLUS(中)", "3DPLUS(法)", "ATMOS", "ATMOS(中)", "ATMOS(法)", "ATMOS3D", "ATMOS3D(中)", "COACH", "COACH(中)", "COACH(法)", "COACH2D", "COACH2D(中)", "COACH2D(法)", "COACH3D", "COACH3D(中)", "COACH3D(法)", "GC", "GC(中)", "GC(法)", "IMAX", "IMAX(中)", "IMAX(法)", "IMAX3D", "IMAX3D(中)", "IMAX3D(法)", "IMAX3DPLUS", "IMAXPLUS", "LOMO", "LOMO(中)", "LOMO(法)", "LOMO3D", "LOMO3D(中)", "LOMO3D(法)", "MX4D", "MX4D(中)", "MX4D(法)", "MX4D3D", "MX4D3D(中)", "MX4D3D(法)", "MX4DATMOS", "MX4DATMOS(中)", "MX4DATMOS(法)", "MX4DATMOS3D", "MX4DATMOA3D(中)", "MX4DATMOA3D(法)", "PLUS", "PLUS(中)", "PLUS(法)", "旗艦", "旗艦(中)", "旗艦(法)", "旗艦3D", "旗艦3D(中)", "旗艦3D(法)"];


		//movie sort handle
		sdata.map((item,key)=>{
			if(item.movie_version === ver){
				item.data_session.map((session , key2)=>{
					return renderSession.push({ cinemainfo:item.cinema_data , session:session , movie:item.movie_id , session_id:session.session_id});
				})
			}
		})

		renderSession.sort((a,b)=>{
			return a.session.session_time - b.session.session_time
		});

		this.setState({
			renderSession,renderVersion
		});

		if(!check){
			this.selectVersion(this.state.renderVersion[0],0,0);
		}


	}

	selectSession(item,index){
		sessionStorage.setItem("cinemaid", item.cinemainfo.cinema_id);

		let box = document.getElementsByClassName('sessionbox');
		document.getElementById('peopleScroll').scrollIntoView({block: "start", behavior: "smooth"});

		for(let i = 0 ; i < box.length ; i++){
			box[i].classList.remove('add');
		}
		box[index].classList.add('add');

		this.setState({
			checked:item
		});

	}

	changeSlider(){
	    this.setState({
	      	slideIndex: this.slider.innerSlider.state.currentSlide
	    });


	    let key = JSON.parse(document.getElementsByClassName('slick-center')[0].getAttribute('data'));

	    this.selectVersion(key.item,key.index,key.index,key.check);

	}

	changeUpdateCount(e) {
	    this.setState({
	      updateCount: this.state.updateCount + 1
	    })
	}


  	render () {

	    return (
	    	<div>
			    <LocationWrapper line={this.state.line} size={this.state.renderVersion.length}>
			    	<div className="wrapper">

			    		<div className="verList">
			    			{
			    				this.state.renderVersion.map((item,index)=>{
			    					return <div className="list" key={index} onClick={()=>this.selectVersion(item,100*index,index,true,1)}>{item}</div>
			    				})
			    			}
			    			<div className="line"></div>
			    		</div>

			    		<div className="rwd-verList">
			    			<Slider {...this.state.settings} ref={c => this.slider = c}>
			    			{
			    				this.state.renderVersion.map((item,index)=>{
			    					let data = { item:item , index:index , check:true };
			    					return <div className="list" key={index} data={JSON.stringify(data)} onClick={()=>this.selectVersion(item,index,index,true,2)}>{item}</div>
			    				})
			    			}
			    			</Slider>
			    		</div>

			    		<div className="box">
			    			<div >
			    				<div className="title">時間</div>
			    				<div className="title">影城</div>
			    				<div className="title">空位數</div>
			    			</div>
			    			{
			    				this.state.renderSession.map((item,index)=>{
			    					let date = timeFormat.sessionTime(item.session.session_time ,'zh-tw');
				    				return(
				    					<div className="sessionbox" key={index} onClick={()=>this.selectSession(item,index)}>
						    				<div className="session cinema">{date}</div>
						    				<div className="session">{item.cinemainfo.cinema_name.zh_tw}</div>
						    				<div className="session seat">{item.session.left_seats}</div>
						    				<Clearfix />
						    			</div>
				    				)
				    			})
			    			}

			    		</div>

			    	</div>
			    	<Clearfix />
			    	<div id="peopleScroll"></div>
			    </LocationWrapper>
			    <BookingChoicePerson session={this.state.checked} location={true} date={this.props.sessionDate}/>
		    </div>
	    )
  	}
}



export default LocationBookingVersion;
