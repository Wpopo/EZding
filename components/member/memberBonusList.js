import React from 'react';
import Router from 'next/router';
import { MemberBonusListWrapper , Clearfix } from '../../styled/memberStyled';
import MemberBonusDetail from './memberBonusDetail';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ChangePages from '../common/changePages';
import IoMore from 'react-icons/lib/io/more';
import IoLoadA from 'react-icons/lib/io/load-a';
import IoIosArrowUp from 'react-icons/lib/io/ios-arrow-up';
import IoIosCalendarOutline from 'react-icons/lib/io/ios-calendar-outline';
//api
import * as memberAPI from '../../actions/memberAPI';

class MemberBonusList extends React.Component {
	constructor(props){
		super(props);

		this.tabClick = this.tabClick.bind(this);
 		this.startOnChange = this.startOnChange.bind(this);
		this.endOnChange = this.endOnChange.bind(this);
		this.getMemberPointsList = this.getMemberPointsList.bind(this);
		this.searchClick = this.searchClick.bind(this);

		this.pageChange = this.pageChange.bind(this);
		this.phoneScrollFetch = this.phoneScrollFetch.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);

		this.state = {
			isLoading:true,
			isScrollLoading:false,
			isScrollEmpty:false,
			isEmpty:false,
			isError:false,
	 		memberPointList:'',
			start: '',//API用
			end:'',//API用
			startDate:null,//套件用
			endDate:null,//套件用
			part:this.props.part,
			nowIndex:1,
			total:1,
			memberPointListRWD:[],
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

		//當月的最後一天和第一天
	 	let date = new Date(), y = date.getFullYear(), m = date.getMonth();
	 	let firstDay = new Date(y, m, 1);
	 	let lastDay = new Date(y, m + 1, 0);

		let showFirstDay = moment(firstDay);
		let showLastDay = moment(lastDay);

		let apiFirstDay = moment.utc(firstDay).valueOf();
		let apiLastDay = moment.utc(lastDay).valueOf();

		this.setState({
			start: apiFirstDay,
			end: apiLastDay,
			startDate: showFirstDay,
			endDate: showLastDay
		},()=>{
			this.getMemberPointsList(1);
		});

	}

	tabClick(index){
		let items = document.getElementsByClassName('tab');
		items[index].classList.add('active');

	}

	searchClick(){
		if(this.state.start && this.state.end){
			this.getMemberPointsList(1);
		}
		else{
			window.alert('請選擇日期區間');
		}
	}

	getMemberPointsList(page){
		let token = localStorage.getItem('accessToken');
		let point_type = 'ez_member_point';
		let begin_time = this.state.start;
		let end_time = this.state.end;
		let page_size = '10';

		if(page <= this.state.total){
			this.setState({
				isScrollEmpty:false,
			})

			memberAPI.getMemberPointsList(token,point_type,begin_time,end_time,page,page_size)
			.then(result=>{

				if(result.code === '401.103'){
					this.props.alertShow(true);
				}
				else if(result.code === '200'){

					if(result.result.list.length == 0){

						this.setState({
							isEmpty:true,
							isResult:false,
							isLoading:false
						},()=>{
							document.getElementById("pickerBonus").readOnly = true;
							document.getElementById("pickerBonus1").readOnly = true;
						})

					}else{

						if(page==1){
							var memberPointListRWD = [];

						}else{
							var memberPointListRWD = this.state.memberPointListRWD;
						}

						result.result.list.map((item,index)=>{
							memberPointListRWD.push(item);
						})

						this.setState({
							memberPointList:result.result,
							memberPointListRWD,
							isResult:true,
							isEmpty:false,
							isLoading:false,
							total:result.result.total_pages,
						},()=>{
							document.getElementById("pickerBonus").readOnly = true;
							document.getElementById("pickerBonus1").readOnly = true;
						});

					}
				}

			})
			.catch(error=>{
				this.setState({
					isLoading:false,
					isResult:false,
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

	startOnChange(date){
		this.setState({
	      startDate: date,
	      start:moment.utc(date).valueOf()
	    });
	}

	endOnChange(date){
		this.setState({
	      endDate: date,
	      end:moment.utc(date).valueOf()
	    });
	}

	pageChange(nowIndex){
		if(nowIndex !== this.state.nowIndex){
			this.setState({
				nowIndex,
			},()=>{
				this.getMemberPointsList(this.state.nowIndex)
			})
		}

	}

	phoneScrollFetch(){
		this.setState({
			nowIndex:this.state.nowIndex + 1
		},()=>{
			this.getMemberPointsList(this.state.nowIndex);
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
		if(this.state.isLoading){
			return(
				<MemberBonusListWrapper part={this.props.part}>
					<div className="tabBox">
	    				<div className="tab" onClick={()=>this.tabClick(0)}>紅利點列表</div>

	    				<div className="dateBox right">
	    					<DatePicker id="pickerBonus"
								selected={this.state.startDate}
								onChange={this.startOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
	    				</div>

						<div className="to"></div>

						<div className="dateBox">
		    				<DatePicker id="pickerBonus1"
							  	selected={this.state.endDate}
					           	onChange={this.endOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
						</div>
						<div className="submit" onClick={this.searchClick}>查詢</div>
	    			</div>
	    			<div className="empty">
    					<IoLoadA className="icon"/>
	    			</div>

				</MemberBonusListWrapper>
			)
		}
		else if(this.state.isResult){
			return (
		    	<MemberBonusListWrapper part={this.props.part}>
	    			{false ?<div className="title">紅利點列表</div>:null}
	    			<div className="tabBox">
	    				<div className="tab" onClick={()=>this.tabClick(0)}>紅利點列表</div>
	    				{false ?<div className="tab" onClick={()=>this.tabClick(1)}>已兌換</div> : null }
	    				{false ?<div className="tab" onClick={()=>this.tabClick(2)}>已過期</div> : null }


	    				<div className="dateBox right">
	    					<DatePicker id="pickerBonus"
								selected={this.state.startDate}
					            onChange={this.startOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
	    				</div>

						<div className="to"></div>

						<div className="dateBox">
		    				<DatePicker id="pickerBonus1"
								selected={this.state.endDate}
								onChange={this.endOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
						</div>
						<div className="submit" onClick={this.searchClick}>查詢</div>
	    			</div>
	    			<div className="tabRWD" onClick={()=>this.tabClick(0)}>
	    				<div className="tab">紅利點列表</div>
	    			</div>

	    			<MemberBonusDetail result={this.state.memberPointList} rwdResult={this.state.memberPointListRWD} />
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
		    	</MemberBonusListWrapper>

	    	)

		}
		else if(this.state.isError || this.state.isEmpty){
			return(
				<MemberBonusListWrapper part={this.props.part}>
					<div className="tabBox">
	    				<div className="tab" onClick={()=>this.tabClick(0)}>紅利點列表</div>

	    				<div className="dateBox right">
	    					<DatePicker id="pickerBonus"
							  	selected={this.state.startDate}
					            onChange={this.startOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
	    				</div>

						<div className="to"></div>

						<div className="dateBox">
		    				<DatePicker id="pickerBonus1"
								selected={this.state.endDate}
								onChange={this.endOnChange}
					            className="date"
					            showYearDropdown
					            showMonthDropdown
					            dateFormatCalendar="MMMM"
					            scrollableYearDropdown
					            yearDropdownItemNumber={5}
					            placeholderText="查詢日期"
								onKeyDown={e => e.preventDefault()}
							/>
						</div>
						<div className="submit" onClick={this.searchClick}>查詢</div>
	    			</div>
	    			<div className="empty">
    					<IoIosCalendarOutline className="iconEmpty"/>
    					此區間沒有紅利點紀錄
	    			</div>
				</MemberBonusListWrapper>
			)
		}



  }
}

export default MemberBonusList;
