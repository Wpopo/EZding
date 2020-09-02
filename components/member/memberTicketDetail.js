import React from 'react';
import { DetailWrapper , Clearfix } from '../../styled/memberStyled';
import timeFormat from '../common/timeFormat';
import Router from 'next/router';


class MemberTicketDetail extends React.Component {
	constructor(props){
		super(props);


		this.state = {
			result:this.props.result,
			rwdResult: this.props.rwdResult
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.result !== this.state.result){
			this.setState({
				result:nextProps.result
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
	    	<DetailWrapper ticket>
	    		<div className="detailWrapper">
	    			<div className="resultTitle">
		    			<div className="bonusText">優惠券明細</div>
		    			<div className="bonusText num">優惠券序號</div>
		    			<div className="bonusText date">起始日期</div>
		    			<div className="bonusText date">到期日期</div>
		    		</div>
		    		{
		    			this.state.result.map((item,index)=>{
		    				let create = timeFormat.bonusDate(item.begin_date);
	    					let expired = timeFormat.bonusDate(item.expired);
		    				return(
		    					<div className="resultBox" key={index}>
				    				<div className="title"></div>
				    				<div className="detail">{item.coupon_name}</div>
				    				<div className="bonus">
				    					<div className="point">{item.coupon_number}</div>
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
		    			})
		    		}
		    	</div>

		    	<div className="detailWrapper mobilePart">
		    		{
		    			this.state.rwdResult.map((item,index)=>{
		    				let create = timeFormat.bonusDate(item.begin_date);
	    					let expired = timeFormat.bonusDate(item.expired);
		    				return(
		    					<div className="resultBox" key={index}>
				    				<div className="title"></div>
				    				<div className="detail">{item.coupon_name}</div>
				    				<div className="bonus">
				    					<div className="point">{item.coupon_number}</div>
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
		    			})
		    		}
		    	</div>

	    	</DetailWrapper>
	    )


  }
}

export default MemberTicketDetail;
