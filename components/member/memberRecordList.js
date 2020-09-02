import React from 'react';
import Router from 'next/router';
import { MemberRecordListWrapper , Clearfix } from '../../styled/memberStyled';
import MemberRecordDetail from './memberRecordDetail';
import ChangePages from '../common/changePages';
import IoMore from 'react-icons/lib/io/more';
import IoLoadA from 'react-icons/lib/io/load-a';
import IoIosArrowUp from 'react-icons/lib/io/ios-arrow-up';
import IoIosCalendarOutline from 'react-icons/lib/io/ios-calendar-outline';

//api
import * as memberAPI from '../../actions/memberAPI';

class MemberRecordList extends React.Component {
	constructor(props){
		super(props);

		this.tabClick = this.tabClick.bind(this);
		this.getRecordList = this.getRecordList.bind(this);

		this.pageChange = this.pageChange.bind(this);
		this.phoneScrollFetch = this.phoneScrollFetch.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);

		this.state = {
			isLoading:true,
			isScrollLoading:false,
			isScrollEmpty:false,
			isEmpty:false,
			isError:false,
			isResult:false,
			part:this.props.part,
			status:0,
			records:[],
			totalRecords:[],
			total:1,
			nowIndex:1,
			token:''
		}
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.part !== this.state.part){
			this.setState({
				part:nextProps.part
			})
		}
	}

	componentDidMount(){
		this.tabClick(0);
		this.setState({
			token:localStorage.getItem('accessToken')
		});
	}

	tabClick(status){
		let items = document.getElementsByClassName('recordTab');
		for(let i = 0 ; i < items.length ; i++){
			items[i].classList.remove('active');
		}
		items[status].classList.add('active');

		this.setState({
			status,
		})

		this.getRecordList(1,status);
	}

	getRecordList(page,status){
		let token = localStorage.getItem('accessToken');
		let is_show = `${status}`;
		let page_size = 10;

		if(page <= this.state.total){
			this.setState({
				isScrollEmpty:false,
			})

			memberAPI.getRecordList(token,is_show,page,page_size)
			.then(result=>{

				if(result.code === '401.103'){
					this.props.alertShow(true);
				}
				else if(result.code === '200'){
					if(result.result.list.length == 0){
						this.setState({
							isEmpty:true,
							isResult:false,
							isLoading:false,
							records:[],
							totalRecords:[]
						})
					}else{

						let totalRecords = page == 1 ? [] : this.state.totalRecords;

						result.result.list.map((item,index)=>{
							totalRecords.push(item);
						});

						this.setState({
							records:result.result.list,
							total:Math.ceil(result.result.total_records / 10),
							totalRecords,
							isLoading:false,
							isResult:true,
							isEmpty:false
						})
					}
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
		}else{
			this.setState({
				isScrollEmpty:true
			})
		}
	}

	pageChange(nowIndex){

		if(nowIndex !== this.state.nowIndex){
			this.setState({
				nowIndex,
			},()=>{
				this.getRecordList(this.state.nowIndex,this.state.status)
			})
		}

	}

	phoneScrollFetch(){
		this.setState({
			nowIndex:this.state.nowIndex + 1
		},()=>{
			this.getRecordList(this.state.nowIndex,this.state.status);
		})

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

	render () {
		let url = `http://ereceipts.fullerton.com.tw/er/api/mof.php?prodline_id=14&origin_id=${this.state.token}`;
		if(this.state.isLoading){
			return (
		    	<MemberRecordListWrapper part={this.props.part} infor={this.props.infor}>
		    		<div className="title">訂票紀錄</div>
		    		<div className="tabBox">
		    			<div className="recordTab" onClick={()=>this.tabClick(0)}>未開演</div>
		    			<div className="recordTab" onClick={()=>this.tabClick(1)}>已開演</div>
						<a className="tabInvoice" href={url} target="_black">發票歸戶</a>
		    		</div>
		    	</MemberRecordListWrapper>
		    )
		}
		else if(this.state.isResult){
			return (
		    	<MemberRecordListWrapper part={this.props.part} infor={this.props.infor}>
		    		<div className="title">訂票紀錄</div>
		    		<div className="tabBox">
		    			<div className="recordTab" onClick={()=>this.tabClick(0)}>未開演</div>
		    			<div className="recordTab" onClick={()=>this.tabClick(1)}>已開演</div>
						<a className="tabInvoice" href={url} target="_black">發票歸戶</a>
		    		</div>

		    		<MemberRecordDetail alertShow={this.props.alertShow} result={this.state.records} rwdResult={this.state.totalRecords} status={this.state.status} getRecordList={this.getRecordList}/>

		    		<div className="pages">
	    				<ChangePages  pages={this.state.total} fetchFunc={this.pageChange} />
	    			</div>

	    			{
	    				this.state.isScrollEmpty ?
	    				null
	    				:
	    				<div className="scroll" onClick={this.phoneScrollFetch}>
		    				{ this.state.isScrollLoading ? <IoLoadA className="load"/> : <IoMore  className="icon"/>}
		    			</div>
	    			}

	    			<div className="onTop" onClick={()=>this.scrollToTop(300)}>
	    				<IoIosArrowUp  className="icon"/>
	    			</div>
		    	</MemberRecordListWrapper>
		    )
		}
		else if(this.state.isError || this.state.isEmpty){
			return (
		    	<MemberRecordListWrapper part={this.props.part} infor={this.props.infor}>
		    		<div className="title">訂票紀錄</div>
		    		<div className="tabBox">
		    			<div className="recordTab" onClick={()=>this.tabClick(0)}>未開演</div>
		    			<div className="recordTab" onClick={()=>this.tabClick(1)}>已開演</div>
						<a className="tabInvoice" href={url} target="_black">發票歸戶</a>
		    		</div>
		    		<div className="empty">
    					<IoIosCalendarOutline className="icon"/>
    					目前沒有訂票紀錄
	    			</div>
		    	</MemberRecordListWrapper>
		    )
		}



  }
}

export default MemberRecordList;
