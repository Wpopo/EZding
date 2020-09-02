import React from 'react';
import Router from 'next/router';
import { Clearfix , MemberQueryWrapper } from '../../styled/memberStyled';
import MemberInfo from './memberInfo';
import MemberBonus from './memberBonus';
import MemberBonusList from './memberBonusList';
import MemberTicket from './memberTicket';
import MemberTicketList from './memberTicketList';
import MemberRecord from './memberRecord';
import MemberRecordList from './memberRecordList';
//api
import * as memberAPI from '../../actions/memberAPI';

class MemberContent extends React.Component {
 	
 	constructor(props){
 		super(props);

 		this.getMemberDetail = this.getMemberDetail.bind(this);
 		this.getMemberNickName = this.getMemberNickName.bind(this);
 		this.alertShow = this.alertShow.bind(this);

 		this.state = {
 			isLoading:true,
 			isError:false,
 			memberDetail:'',
 			nickname:'',
 			query:this.props.url.query.part

 		}
 	}
 	componentWillReceiveProps(nextProps){
		if(nextProps.url.query.part !== this.state.query){
			this.setState({
				query:nextProps.url.query.part
			})
		}
	}

 	componentDidMount(){		
 		this.getMemberDetail();
 	}

 	getMemberDetail(){
 		this.setState({
 			isLoading:true
 		});

 		let token = localStorage.getItem('accessToken');
		memberAPI.memberDetail(token)
		.then(result=>{
			if(result.code === '401.103'){
				this.props.alertShow(true);
			}
			else if(result.code === '200'){
				this.setState({
					memberDetail:result.result,
				});

				this.getMemberNickName(token);
			}

		})
		.catch(error=>{
			this.setState({
				isError:true
			},()=>{
				this.props.alertShow(true);
			});
		})
	}

	getMemberNickName(token){
		memberAPI.memberNickName(token)
		.then(result=>{
			if(result.code === '401.103'){
				this.props.alertShow(true);
			}
			else if(result.code === '200'){

				this.setState({
					isLoading:false,
					nickname:result.result,
				});
			}
		})
		.catch(error=>{
			this.setState({
				isError:true
			},()=>{
				this.props.alertShow(true);
			});
		})
	}

	alertShow(boolean){
		this.props.alertShow(boolean);
	}

	render () {
		if(this.state.isLoading){
			return(
				<MemberQueryWrapper >
					<div className="wrapper">
						<MemberInfo  alertShow={this.alertShow} isLoading={this.state.isLoading}/>
						<MemberBonus  alertShow={this.alertShow} isLoading={this.state.isLoading}/>
						<MemberTicket  alertShow={this.alertShow} isLoading={this.state.isLoading}/>
						<MemberRecord  alertShow={this.alertShow} isLoading={this.state.isLoading}/>

						{this.state.query == "bonus" ? <MemberBonusList alertShow={this.alertShow} part={true} /> : null}
			    		{this.state.query == "ticket" ? <MemberTicketList alertShow={this.alertShow} part={true} /> : null}
			    		{this.state.query == "records" ? <MemberRecordList alertShow={this.alertShow} part={true} /> : null}
			    	</div>
			    	<Clearfix />
				</MemberQueryWrapper>
			)
		}
		else if(this.state.memberDetail){
			return (
			    <MemberQueryWrapper>
			    	<div className="wrapper">
				    	{this.state.query == "information" ? <MemberInfo url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} nickname={this.state.nickname} part={true} /> : <MemberInfo url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} nickname={this.state.nickname} part={false}/>}
				    	{this.state.query == "bonus" ? <MemberBonus url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={true} /> : <MemberBonus url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={false}/>}
				    	{this.state.query == "ticket" ? <MemberTicket url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={true} /> : <MemberTicket url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={false}/>}
				    	{this.state.query == "records" ? <MemberRecord url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={true} /> : <MemberRecord url={this.props.url} alertShow={this.alertShow} memberDetail={this.state.memberDetail} part={false}/>}
			    		
				    	{this.state.query == "bonus" ? <MemberBonusList alertShow={this.alertShow} part={true} /> : null}
			    		{this.state.query == "ticket" ? <MemberTicketList alertShow={this.alertShow} part={true} /> : null}
			    		{this.state.query == "records" ? <MemberRecordList alertShow={this.alertShow} part={true} /> : null}
			    	</div>
			    	<Clearfix />
			    </MemberQueryWrapper>
		    )
		}else if(this.state.isError){
			return(
				<MemberQueryWrapper>
					<div className="wrapper">
						<MemberInfo  alertShow={this.alertShow} isError={this.state.isError}/>
						<MemberBonus  alertShow={this.alertShow} isError={this.state.isError}/>
						<MemberTicket  alertShow={this.alertShow} isError={this.state.isError}/>
						<MemberRecord  alertShow={this.alertShow} isError={this.state.isError}/>

						{this.state.query == "bonus" ? <MemberBonusList part={true} alertShow={this.alertShow} /> : null}
			    		{this.state.query == "ticket" ? <MemberTicketList part={true} alertShow={this.alertShow} /> : null}
			    		{this.state.query == "records" ? <MemberRecordList part={true} alertShow={this.alertShow} /> : null}
			    	</div>
			    	<Clearfix />
				</MemberQueryWrapper>
			)
		}
	    
  }
}

export default MemberContent;