import React from 'react';
import { DetailWrapper,Clearfix } from '../../styled/memberStyled';
import MdAdd from 'react-icons/lib/md/add';
import timeFormat from '../common/timeFormat';
import Router from 'next/router';
//api
import * as memberAPI from '../../actions/memberAPI';

class MemberBonusDetail extends React.Component {
	constructor(props){
		super(props);


		this.state = {
			result:this.props.result.list,
			rwdResult: this.props.rwdResult
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.result !== this.state.result){
			this.setState({
				result:nextProps.result.list
			})
		}
		if(nextProps.rwdResult !== this.state.rwdResult){
			this.setState({
				rwdResult:nextProps.rwdResult
			})
		}

	}

	render () {

	    return (
	    	<DetailWrapper>
	    		<div className="detailWrapper">
	    			<div className="resultTitle">
	    				<div className="bonusText">紅利使用明細</div>
	    				<div className="bonusText bonus">紅利點數</div>
	    				<div className="bonusText date">起始日期</div>
	    				<div className="bonusText date">到期日期</div>
	    			</div>

	    			{
	    				this.state.result.map((item,index)=>{
	    					if(item.generate_behavior == 1){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">消費贈點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 2){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">活動贈點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 3){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">退貨還點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 4){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">兌換使用</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 5){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">活動扣點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 6){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">退貨扣點</div>
					    				<div className="detail">{item.point_name}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 7){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">點數調整</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 8){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">其他</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}else{
								let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">其他</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
							}

	    				})
	    			}
	    		</div>
	    		<div className="detailWrapper mobilePart">
	    			{
	    				this.state.rwdResult.map((item,index)=>{
	    					if(item.generate_behavior == 1){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">消費贈點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 2){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">活動贈點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 3){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">退貨還點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    					<MdAdd className="icon" />
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 4){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">兌換使用</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 5){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">活動扣點</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 6){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">退貨扣點</div>
					    				<div className="detail">{item.point_name}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point remove">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 7){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">點數調整</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}
	    					else if(item.generate_behavior == 8){
	    						let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">其他</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
	    					}else{
								let create = timeFormat.bonusDate(item.created_time);
	    						let expired = timeFormat.bonusDate(item.expired_date);
	    						return(
	    							<div className="resultBox" key={index}>
					    				<div className="title">其他</div>
					    				<div className="detail">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="text">點</div>
					    					<div className="point">{item.point}</div>
					    				</div>
					    				<div className="date">
					    					<div className="dateTitle">起始日期</div>
					    					<div className="year">{create.year}</div>
					    					<div className="month">{create.month}</div>
					    				</div>
					    				<div className="date over">
					    					<div className="dateTitle">到期日期</div>
					    					<div className="year">{expired.year}</div>
					    					<div className="month">{expired.month}</div>
					    				</div>
					    			</div>
	    						)
							}
	    				})
	    			}
	    		</div>
	    	</DetailWrapper>
	    )


  }
}

export default MemberBonusDetail;
