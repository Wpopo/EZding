import React from 'react';
import Router from 'next/router';
import { MemberTicketWrapper , Clearfix} from '../../styled/memberStyled';
import timeFormat from '../common/timeFormat';
//api
import * as memberAPI from '../../actions/memberAPI';


class MemberTicket extends React.Component {
	constructor(props){
		super(props);

		this.ticketOnChange = this.ticketOnChange.bind(this);
		this.couponToAccount = this.couponToAccount.bind(this);
		this.tipsClick = this.tipsClick.bind(this);
		this.gotoList = this.gotoList.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			ticketNum:'',
			isTipsShow:false,
			alertWord:'',
		}
	}

	ticketOnChange(e){
		this.setState({
			ticketNum:e.target.value
		})
	}
	componentDidMount(){
	}

	couponToAccount(){
		let token = localStorage.getItem('accessToken');
		let coupon_number = this.state.ticketNum;

		memberAPI.couponToAccount(token,coupon_number)
		.then(result=>{
			if(result.code !== '200'){
				if(result.code === '403.107' || result.code === '404.007'){
					this.setState({
						alertWord:'此優惠券號碼不存在'
					});
				}else if(result.code === '403.313'){
					this.setState({
						alertWord:'優惠券歸戶失敗'
					});
				}else if(result.code === '409.006'){
					this.setState({
						alertWord:'優惠券無法歸戶，該序號為其他帳號所擁有'
					});
				}else if(result.code === '401.103'){
					this.props.alertShow(true);
				}
				
			}else if(result.code === '200'){
				this.setState({
					alertWord:'',
					ticketNum:''
				},()=>{
					alert('優惠券歸戶成功！');
					this.gotoList();
				});
			}
			
		})
		.catch(error=>{
			this.props.alertShow(true);
			
		})
	}

	

	tipsClick(){
		this.setState({
			isTipsShow:!this.state.isTipsShow
		})
	}

	gotoList(){
		Router.push({
            pathname:'/memberCenter',
            query:{
                part: 'ticket'
            }
        });
	}

	render () {
		return (
		    <MemberTicketWrapper part={this.props.part}>
		    	<div className="ticketWrapper">
		    		<div className="titlebox">
	    				<div className="title">優惠券管理</div>
	    				<img onClick={this.tipsClick} className="tips" src="../../static/member/information_pink.svg"/>
	    				{ this.state.isTipsShow ? <div className="tipsBox">＊若您的票券為參與活動取得之票券因配合活動主辦單位之規定，逾期即無法延長使用。敬請見諒!!</div> : null }
	    				<img className="listBtn" onClick={this.gotoList} src="../../static/member/list.svg"/>
	    				<div className="listtxt" onClick={this.gotoList}>優惠列表</div>
	    			</div>

	    			<div className="box">
	    				<input type="text" placeholder="請輸入優惠券序號" maxLength="10" onChange={this.ticketOnChange} value={this.state.ticketNum}/>
	    				<div className="submit" onClick={this.couponToAccount}>送出歸戶</div>
	    				<div className="alert">{this.state.alertWord}</div>
	    			</div>

		    	</div>
		    </MemberTicketWrapper>
    	)
	   
  }
}

export default MemberTicket;