import React from 'react';
import { MemberRecordWrapper } from '../../styled/memberStyled';
import timeFormat from '../common/timeFormat';
import Router from 'next/router';

//api
import * as memberAPI from '../../actions/memberAPI';

class MemberRecord extends React.Component {
	constructor(props){
		super(props);

		this.tipsClick = this.tipsClick.bind(this);
		this.getRecordList = this.getRecordList.bind(this);
		this.gotoList = this.gotoList.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			isEmpty:false,
			isTipsShow:false,
			records:'',
		}

	} 

	componentDidMount(){
		this.getRecordList(0);
	}

	tipsClick(){
		this.setState({
			isTipsShow:!this.state.isTipsShow
		})
	}

	getRecordList(status){
		this.setState({
			isLoading:true
		})
		let token = localStorage.getItem('accessToken');
		let is_show = `${status}`;
		let page = 1;
		let page_size = 10;

		memberAPI.getRecordList(token,is_show,page,page_size)
		.then(result=>{

			if(result.result.list.length == 0 && status == 0){
				this.getRecordList(1);
			}else if(result.result.list.length == 0 && status == 1){
				this.setState({
					isLoading:false,
					isEmpty:true
				});
			}else{
				this.setState({
					records:result.result.list,
					isLoading:false
				})
			}
			
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true
			},()=>{
				this.props.alertShow(true);
			})
		})
	}

	gotoList(){
		Router.push({
            pathname:'/memberCenter',
            query:{
                part: 'records'
            }
        });
	}

	render () {
		if(this.state.isLoading){
			return(
				<MemberRecordWrapper>
			    	<div className="recordWrapper">
			    		<div className="titlebox">
		    				<div className="title">訂票紀錄</div>
		    				<img onClick={this.tipsClick} className="tips" src="../../static/member/information_pink.svg"/>
		    				{ this.state.isTipsShow ? <div className="tipsBox">*本列表僅提供查詢７個月內訂單</div> : null }
		    				<img className="listBtn" onClick={this.gotoList} src="../../static/member/list.svg"/>
		    				<div className="listtxt" onClick={this.gotoList}>訂單列表</div>
		    			</div>

		    			<div className="recordbox">
		    				<div className="poster"></div>
		    			</div>

				    </div>
			    </MemberRecordWrapper>
			)
		}
		else if(this.state.records.length > 0){
			let record = this.state.records[0];
			let time = timeFormat.sessionOfRecords(record.data_session.session_time);
			let poster = record.poster_url !== null && record.poster_url!== "" ? record.poster_url : '../../static/member/poster.png';

			return (
			    <MemberRecordWrapper>
			    	<div className="recordWrapper">
			    		<div className="titlebox">
		    				<div className="title">訂票紀錄</div>
		    				<img onClick={this.tipsClick} className="tips" src="../../static/member/information_pink.svg"/>
		    				{ this.state.isTipsShow ? <div className="tipsBox">*本列表僅提供查詢７個月內訂單</div> : null }
		    				<img className="listBtn" onClick={this.gotoList} src="../../static/member/list.svg"/>
		    				<div className="listtxt" onClick={this.gotoList}>訂單列表</div>
		    			</div>

		    			<div className="recordbox">
		    				<div className="poster" style={{backgroundImage:`url(${poster})`}}></div>
		    				<div className="record">
		    					<div className="box">
		    						<div className="title">訂票序號</div>
		    						<div className="content">{record.booking_number}</div>
		    					</div>
		    					<div className="movie">{record.movie_title.zh_tw}</div>
		    					<div className="date">{time.date}</div>
		    					<div className="time">{time.time}</div>

		    					<div className="cinema">
		    						<div className="title">影城</div>
		    						<div className="content">{record.cinema_name.zh_tw}</div>
		    					</div>

		    					<div className="seats">
		    						<div className="title">座位</div>
		    						<div className="content">{record.seats}</div>
		    						
		    					</div>
		    				</div>
		    			</div>

				    </div>
			    </MemberRecordWrapper>
		    )
		}
		else if(this.state.isEmpty){
			return (
			    <MemberRecordWrapper>
			    	<div className="recordWrapper">
			    		<div className="titlebox">
		    				<div className="title">訂票紀錄</div>
		    				<img onClick={this.tipsClick} className="tips" src="../../static/member/information_pink.svg"/>
		    				{ this.state.isTipsShow ? <div className="tipsBox">*本列表僅提供查詢７個月內訂單</div> : null }
		    				<img className="listBtn" src="../../static/member/list.svg"/>
		    				<div className="listtxt">訂單列表</div>
		    			</div>

		    			<div className="recordbox">
		    				<div className="poster" style={{backgroundImage:`url(../../static/member/poster.png)`}}></div>
		    				<div className="record">
		    					<div className="box">
		    						<div className="movie">沒有訂票紀錄</div>
		    					</div>
		    				</div>
		    			</div>

				    </div>
			    </MemberRecordWrapper>
		    )
		}else{
			return (
			    <MemberRecordWrapper>
			    	<div className="recordWrapper">
			    		<div className="titlebox">
		    				<div className="title">訂票紀錄</div>
		    				<img onClick={this.tipsClick} className="tips" src="../../static/member/information_pink.svg"/>
		    				{ this.state.isTipsShow ? <div className="tipsBox">*本列表僅提供查詢７個月內訂單</div> : null }
		    				<img className="listBtn" src="../../static/member/list.svg"/>
		    				<div className="listtxt">訂單列表</div>
		    			</div>

		    			<div className="recordbox">
		    				<div className="poster"></div>
		    			</div>

				    </div>
			    </MemberRecordWrapper>
		    )
		}
	    
  }
}

export default MemberRecord;