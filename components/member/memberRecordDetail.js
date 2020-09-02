import React from 'react';
import Router from 'next/router';
import { DetailWrapper , Clearfix } from '../../styled/memberStyled';
import timeFormat from '../common/timeFormat';
import IoIosArrowUp from 'react-icons/lib/io/ios-arrow-up';
import IoAndroidAdd from 'react-icons/lib/io/android-add';
import IoLoadA from 'react-icons/lib/io/load-a';
import IoAndroidRemove from 'react-icons/lib/io/android-remove';
import IoIosCloseOutline from 'react-icons/lib/io/ios-close-outline';

//api
import * as memberAPI from '../../actions/memberAPI';

class MemberRecordDetail extends React.Component {
	constructor(props){
		super(props);

		this.resultOpenClick = this.resultOpenClick.bind(this);
		this.resultCloseClick = this.resultCloseClick.bind(this);
		this.tabClick = this.tabClick.bind(this);
		this.getOrderInformation = this.getOrderInformation.bind(this);
		this.cancelSeatClick = this.cancelSeatClick.bind(this);
		this.cancelAlertClick = this.cancelAlertClick.bind(this);

		this.state = {
			result:this.props.result,
			rwdResult: this.props.rwdResult,
			isResultShow:false,
			isDetailLoading:false,
			isCancelLoading:false,
			cancelText:'1234567',
			num:0,
			cancelStatus:['取消訂票','已取票','已取消訂票'],
			showStatus:['未取票','已開演','已線上取消'],
			order:'',
			status:this.props.status,
			cancelAlert:false,
			cancelOrderId:""
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
		if(nextProps.status !== this.state.status){
			this.setState({
				status:nextProps.status,
			},()=>{
				this.resultCloseClick(false);
			})
		}
	}

	getOrderInformation(ez_order_id){
		this.setState({
			isDetailLoading:true
		})

		let token = localStorage.getItem('accessToken');

		memberAPI.getOrderInformation(token,ez_order_id)
		.then(result=>{
			this.setState({
				order:result.result,
				isDetailLoading:false
			})
		})
		.catch(error=>{
			this.setState({
				isDetailLoading:true
			},()=>{
				this.props.alertShow(true);
			})

		})
	}

	resultOpenClick(boolean,index,ez_order_id,rwd){
		this.setState({
			cancelText:'',
			isDetailLoading:true
		})
		this.getOrderInformation(ez_order_id);

		let items = document.getElementsByClassName('detailBox');
		let openItems = document.getElementsByClassName('detailBoxOpen');

		for(let i = 0 ; i < items.length ; i++){
			items[i].classList.remove('hide');
		}
		for(let j = 0 ; j < openItems.length ; j++){
			openItems[j].classList.remove('show');
		}

		if(rwd){
			document.body.style.overflow = 'hidden';

			let rwdItems = document.getElementsByClassName('recordBox');
			let openItemsRWD = document.getElementsByClassName('detailBoxOpenRWD');

			for(let j = 0 ; j < openItemsRWD.length ; j++){
				openItemsRWD[j].classList.remove('show');
			}
			openItemsRWD[index].classList.add('show');

			this.tabClick(0,index,rwd);

		}else{
			openItems[index].classList.add('show');
			items[index].classList.add('hide');

			this.tabClick(0,index,rwd);
		}



		this.setState({
			isResultShow:boolean,
		})
	}

	resultCloseClick(boolean){
		let items = document.getElementsByClassName('detailBox');
		let openItems = document.getElementsByClassName('detailBoxOpen');
		let openItemsRWD = document.getElementsByClassName('detailBoxOpenRWD');
		let rwdItems = document.getElementsByClassName('recordBox');

		document.body.style.overflow = 'auto';

		for(let i = 0 ; i < items.length ; i++){
			items[i].classList.remove('hide');
		}
		for(let j = 0 ; j < openItems.length ; j++){
			openItems[j].classList.remove('show');
		}
		for(let k = 0 ; k < openItemsRWD.length ; k++){
			openItemsRWD[k].classList.remove('show');
		}

		for(let r = 0 ; r < rwdItems.length ; r++){
			rwdItems[r].classList.remove('hide');
		}

		this.setState({
			isResultShow:boolean
		})
	}

	tabClick(num,index,rwd){
		let tabs = document.getElementsByClassName('recordDetailTab');
		let tabsRWD = document.getElementsByClassName('recordDetailTabRWD');

		for(let i = 0 ; i < tabs.length ; i++){
			tabs[i].classList.remove('active');
		}
		for(let j = 0 ; j < tabsRWD.length ; j++){
			tabsRWD[j].classList.remove('active');
		}

		if(rwd){
			tabsRWD[index*2 + num].classList.add('active');
		}
		else{
			tabs[index*2 + num].classList.add('active');
		}

		this.setState({
			num,
		})

	}

	// 再次確認是否取消
	cancelAlertClick(index,order_id){

		if(index == 0){
			document.querySelectorAll("body")[0].style.overflowY = "hidden";
			this.setState({
				cancelAlert:true,
				cancelOrderId: order_id
			})
		}
	}

	// 選擇是否取消
	cancelChoose(val){

		if(val){
			this.cancelSeatClick(0 , this.state.cancelOrderId)
		}

		this.setState({
			cancelAlert:false
		})
		document.querySelectorAll("body")[0].style.overflowY = "visible";

	}

	// 執行取消
	cancelSeatClick(index,order_id){
		let token = localStorage.getItem('accessToken');

		if(index == 0){
			this.setState({
				isCancelLoading:true,
				cancelText:'',
			})
			memberAPI.cancelBookingRecord(token,order_id)
			.then(result=>{
				if(result.code == 200){
					this.setState({
						isCancelLoading:false,
						cancelText:'',
					})
					this.props.getRecordList(1,this.state.status);
				}else{
					this.setState({
						isCancelLoading:false,
						cancelText:result.message,
					});
					this.props.getRecordList(1,this.state.status);
					this.getOrderInformation(order_id);
				}

			})
			.catch(error=>{
				this.setState({
					isCancelLoading:false
				},()=>{
					this.props.alertShow(true);
				})
			})
		}
	}

	render () {

	    return (
	    	<DetailWrapper records>
	    		<div className="detailWrapper">
					{ this.state.cancelAlert ?
						<div>
							<div className="cancelAlert"></div>
							<div className="cancelBox">
								<div className="mainText">確認取消此筆訂單？</div>
								<div className="subText">訂票手續費依影城規定恕不退還</div>
								<div className="btnArea">
									<div className="btn" onClick={()=>this.cancelChoose(false)}>關閉</div>
									<div className="btn" onClick={()=>this.cancelChoose(true)}>確認</div>
								</div>
							</div>
						</div>
						:null
					}

	    			{
	    				this.state.isResultShow ?
	    				null
	    				:
	    				<div className="resultTitle">
			    			<div className="bonusText recordMovie">電影</div>
			    			<div className="bonusText recordName">電影名稱</div>
			    			<div className="bonusText num">訂票序號</div>
			    			<div className="bonusText date">開演日期</div>
			    			<div className="bonusText date">開演時間</div>
			    			<div className="bonusText recordMore">詳細內容</div>
			    		</div>

	    			}

		    		{
		    			this.state.result.map((item,index)=>{
		    				let session = timeFormat.sessionOfRecords(item.data_session.session_time);

		    				let poster = item.poster_url !== null && item.poster_url!== "" ? item.poster_url : '../../static/member/poster.png';
		    				return(
		    					<div className="resultBox recordBox" key={index}>
	    							<div className="detailBoxOpen">
	    								<div className="closeBox"  onClick={()=>this.resultCloseClick(false)}>
	    									<IoIosArrowUp className="closeIcon" />
	    								</div>
	    								<div className="detailTopBox">
	    									<div className="poster" style={{backgroundImage:`url(${poster})`}}></div>
	    									<div className="movieName">
	    										<div className="movieTitle">電影名稱</div>
	    										<div className="content" title={item.movie_title.zh_tw}>{item.movie_title.zh_tw}</div>
	    									</div>
	    									<div className="movieName num">
	    										<div className="movieTitle">訂票序號</div>
	    										<div className="content">{item.booking_number}</div>
	    									</div>
	    									<div className="movieName date">
	    										<div className="movieTitle">開演日期</div>
	    										<div className="month">{session.date}</div>
						    					<div className="year">{session.year}</div>

						    				</div>

						    				<div className="movieName date">
	    										<div className="movieTitle">開演時間</div>
						    					<div className="month">{session.time}</div>
						    				</div>
	    								</div>

	    								<div className="detailTab">
	    									<div className="recordDetailTab" onClick={()=>this.tabClick(0,index)}>訂單資料</div>

	    									{true ? null : <div className="recordDetailTab" onClick={()=>this.tabClick(1,index)}>QR-code</div>}

	    									<div className="recordDetailTab" onClick={()=>this.tabClick(1,index)}>購票證明</div>
	    								</div>
	    								{
	    									this.state.num == 0 && this.state.order ?
    										<div className="detailMore">
    											<div className="leftBox">
    												<div className="cinemaBox">
    													<div className="cinema">影城</div>
    													<div className="cinemaName" title={item.movie_title.zh_tw}>{item.cinema_name.zh_tw}</div>
    												</div>
    												<div className="cinemaBox">
    													<div className="cinema">座位</div>
    													<div className="cinemaName">{item.seats}</div>
    												</div>
    												<div className="cancelText">{this.state.cancelText}</div>
													{this.state.status == 1 ? <div className='cancelBtn cancelBtn2'>{this.state.showStatus[parseInt(item.wv_booking_status)]}</div> : null }
													{this.state.status == 0 ? <div onClick={()=>this.cancelAlertClick(`${parseInt(item.wv_booking_status)}`,item.order_id)} className={`cancelBtn cancelBtn${parseInt(item.wv_booking_status)}`}>{this.state.cancelStatus[parseInt(item.wv_booking_status)]}{this.state.isCancelLoading?<IoLoadA className="loadIcon"/>:null}</div> : null }
    											</div>
    											<div className="rightBox">
    												{
    													false?
    													<div className="productBox">
	    													<div className="preTitle">優惠方式</div>
	    													<div className="bank"></div>
	    												</div>
	    												:
	    												null
    												}
													
    												<div className="productBox">
    													<div className="preTitle">商品</div>

    													{this.state.order.booking_detail.map((detail,key)=>{
    														return(
    															<div className="products" key={key}>
																	<div className="name">{detail.ez_product_name}</div>
																	<div className="quantity">{detail.quantity}{detail.ez_product_master_id == 'EZ Combo' || detail.ez_product_master_id == 'EZ Combo Upgrade' ? '份':'張'}</div>
																	<div className="priceAndPoint">
																		<div className="inPoint">{detail.point == 0 ? '' : `${detail.point}點＋`}</div>
																		<div className="inPrice">{parseInt(detail.price,10) + parseInt(detail.plus_price,10)}元</div>
																	</div>
																</div>
    														)
    													})}

    												</div>
    												<div className="productBox">
    													<div className="preTitle">手續費</div>
    													<div className="products">
    														<div className="name">訂票手續費</div>
    														<div className="price">{this.state.order.fee_sum}元</div>
    													</div>
    												</div>
    												<div className="productBox">
    													<div className="preTitle">自付額</div>
    													<div className="products">
    														<div className="name"></div>
    														<div className="mainNum">{this.state.order.price_sum + this.state.order.fee_sum + this.state.order.plus_price_sum}<span>元</span></div>
    													</div>
    												</div>

    												<div className="productBox box">
    													<div className="preTitle">本次消費獎勵</div>
    													<div className="products">
    														<div className="name">會員紅利</div>
    														<div className="quantity">{this.state.order.ez_member_point_expect}<span>點</span></div>
    													</div>
    													<div className="products">
    														<div className="name">亞洲萬里通里數</div>
    														<div className="quantity">{this.state.order.asiamiles_expect}<span>里數</span></div>
    													</div>
    												</div>
    											</div>
    										</div>
	    									:
	    									<div>
		    									{
		    										this.state.isDetailLoading ?
		    										<div className="detailMore">
			    										<IoLoadA  className="loading"/>
			    									</div>
			    									:
			    									null
		    									}
	    									</div>

	    								}
	    								{
	    									// this.state.num == 1 ?
    										// <div className="detailMore">
    										// 這邊是QRcode區
    										// </div>
	    									// :
	    									// null
	    								}
	    								{
	    									this.state.num == 1 ?
    										<div className="detailMore">
    											<div className="leftBox">
    												<div className="bookDateBox">
    													<div className="dateTitle">購買日期</div>
    													<div className="dateDate">
    														<div className="month">{timeFormat.bonusDate(this.state.order.created_time).month}</div>
    														<div className="year">{timeFormat.bonusDate(this.state.order.created_time).year}</div>
    													</div>
    												</div>
													<div>
    													<div className="bookDateBox">
	    													<div className="dateTitle">發票日期</div>
	    													<div className="dateDate">
																{
																	this.state.order.inv_date?
																	<div>
																		<div className="month">{timeFormat.bonusDate(this.state.order.inv_date).month}</div>
																		<div className="year">{timeFormat.bonusDate(this.state.order.inv_date).year}</div>
																	</div>
																	:
																	<div className="month"><IoAndroidRemove className="removeIcon"/></div>
																}
															</div>
	    												</div>
	    												<div className="bookDateBox">
	    													<div className="dateTitle">發票號碼</div>
	    													<div className="invNum">{this.state.order.inv_no?this.state.order.inv_no:<IoAndroidRemove className="removeIcon"/>}</div>
	    												</div>
    												</div>
    												<div className="leftBottmBox">
    													1. 因電影票課徵娛樂稅,因此全台影城電影購票皆不開立發票，而以票根作為購買證明，故只開立訂票手續費及餐飲發票。<br />
														2. 發票開立日期為開演後3~5天。<br />
														3. 發票尚未開立前，將不會出現購買證明標章。<br />
														4. 如取消訂票或退票，此購買證明視同失效。<br />
    												</div>
    											</div>
												{
													item.inv_no ?
													<div className="rightBox">
	    												<div className="provBox" style={{backgroundImage:`url(${'../../static/member/prov0.png'})`}}></div>
	    												<div className="text"></div>
	    											</div>
													:
													<div className="rightBox">
														<div className="provBox" style={{backgroundImage:`url(${'../../static/member/prov2.png'})`}}></div>
														<div className="text"></div>
													</div>
												}
    										</div>
	    									:
	    									null
	    								}
	    							</div>

	    							<div className="detailBox">
	    								<div className="title recordMovie">
					    					<div className="poster" style={{backgroundImage:`url(${poster})`}}></div>
					    				</div>
					    				<div className="detail recordName">{item.movie_title.zh_tw}</div>
					    				<div className="bonus">
					    					<div className="point">{item.booking_number}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year">{session.year}</div>
					    					<div className="month">{session.date}</div>
					    				</div>
					    				<div className="date">
					    					<div className="year no">0000</div>
					    					<div className="month">{session.time}</div>
					    				</div>
					    				<div className="recordMore">
					    					<div className="text" onClick={()=>this.resultOpenClick(true,index,item.order_id,false)}>詳細</div>
					    				</div>
	    							</div>
				    			</div>
		    				)
		    			})
		    		}
	    		</div>

	    		<div className="detailWrapper mobilePart">
					{ this.state.cancelAlert ?
						<div>
							<div className="cancelAlert"></div>
							<div className="cancelBox">
								<div className="mainText">確認取消此筆訂單？</div>
								<div className="subText">訂票手續費依影城規定恕不退還</div>
								<div className="btnArea">
									<div className="btn" onClick={()=>this.cancelChoose(false)}>關閉</div>
									<div className="btn" onClick={()=>this.cancelChoose(true)}>確認</div>
								</div>
							</div>
						</div>
						: null
					}
		    		{
		    			this.state.rwdResult.map((item,index)=>{
		    				let session = timeFormat.sessionOfRecords(item.data_session.session_time);

		    				let poster = item.poster_url !== null && item.poster_url!== "" ? item.poster_url : '../../static/member/poster.png';

		    				let movieNameRWD;
		    				if(item.movie_title.zh_tw.length > 20){
		    					movieNameRWD = item.movie_title.zh_tw.slice(0,20);
		    					movieNameRWD += '...';
		    				}else{
		    					movieNameRWD = item.movie_title.zh_tw;
		    				}
		    				return(
		    					<div key={index}>
			    					<div className="resultBox recordBox" onClick={()=>this.resultOpenClick(true,index,item.order_id,true)}>
		    							<div className="detailBox">
		    								<div className="title recordMovie">
						    					<div className="poster" style={{backgroundImage:`url(${poster})`}}></div>
						    				</div>
						    				<div className="detail recordName">{item.movie_title.zh_tw}</div>
						    				<div className="detail recordName recordNameRWD">{movieNameRWD}</div>
						    				<div className="bonus recordBonus">
						    					<div className="text">訂票序號</div>
						    					<div className="point">{item.booking_number}</div>
						    				</div>
						    				<div className="date recordDate">
						    					<div className="month">{session.date}</div>
						    					<div className="month session">{session.time}</div>
						    				</div>
		    							</div>
					    			</div>
					    			<div className="detailBoxOpenRWD">
					    				<div className="boxBackGround">
		    								<div className="closeBox"  onClick={()=>this.resultCloseClick(false)}>
		    									<IoIosCloseOutline className="closeIconRWD"/>
		    								</div>
		    								<div className="detailTopBox">
		    									<div className="poster" style={{backgroundImage:`url(${poster})`}}></div>
		    									<div className="movieName num">
		    										<div className="movieTitle">訂票序號</div>
		    										<div className="content">{item.booking_number}</div>
		    									</div>

		    									<div className="movieName date">
		    										<div className="movieTitle">場次時間</div>
		    										<div className="month">{session.date}</div>
		    										<div className="month">{session.time}</div>
							    				</div>
		    								</div>

		    								<div className="detailTab">
		    									<div className="recordDetailTabRWD" onClick={()=>this.tabClick(0,index,true)}>訂單資料</div>

		    									{true ? null : <div className="recordDetailTabRWD" onClick={()=>this.tabClick(1,index,true)}>QR-code</div>}

		    									<div className="recordDetailTabRWD" onClick={()=>this.tabClick(1,index,true)}>購票證明</div>
		    								</div>
		    								{
		    									this.state.num == 0 && this.state.order ?
	    										<div className="detailMore">
	    											<div className="leftBox">
	    												<div className="cinemaBox">
	    													<div className="cinema">電影</div>
	    													<div className="cinemaName">{item.movie_title.zh_tw}</div>
	    												</div>
	    												<div className="cinemaBox">
	    													<div className="cinema">影城</div>
	    													<div className="cinemaName">{item.cinema_name.zh_tw}</div>
	    												</div>
	    												<div className="cinemaBox">
	    													<div className="cinema">座位</div>
	    													<div className="cinemaName">{item.seats}</div>
	    												</div>
	    											</div>
	    											<div className="rightBox">
	    												{
	    													false?
	    													<div className="productBox">
		    													<div className="preTitle">優惠方式</div>
		    													<div className="bank"></div>
		    												</div>
		    												:
		    												null
	    												}
	    												<div className="productBox">
	    													<div className="preTitle">商品</div>

	    													{this.state.order.booking_detail.map((detail,key)=>{
	    														return(
																	<div className="products" key={key}>
																		<div className="name">{detail.ez_product_name}</div>
																		<div className="quantity">{detail.quantity}{detail.ez_product_master_id == 'EZ Combo' || detail.ez_product_master_id == 'EZ Combo Upgrade' ? '份':'張'}</div>
																		<div className="priceAndPoint">
																			<div className="inPoint">{detail.point == 0 ? '' : `${detail.point}點＋`}</div>
																			<div className="inPrice">{parseInt(detail.price,10) + parseInt(detail.plus_price,10)}元</div>
																		</div>
																	</div>
	    														)
	    													})}

	    												</div>
	    												<div className="productBox">
	    													<div className="preTitle">手續費</div>
	    													<div className="products">
	    														<div className="name">訂票手續費</div>
	    														<div className="price">{this.state.order.fee_sum}元</div>
	    													</div>
	    												</div>
	    												<div className="productBox preTitleRWD">
	    													<div className="preTitle">自付額</div>
	    													<div className="products">
	    														<div className="quantity">{this.state.order.price_sum + this.state.order.fee_sum + this.state.order.plus_price_sum}<span>元</span></div>
	    													</div>
	    												</div>

	    												<div className="productBox box">
	    													<div className="preTitle">本次消費獎勵</div>
	    													<div className="products">
	    														<div className="name">會員紅利</div>
	    														<div className="quantity">{this.state.order.ez_member_point_expect}<span>點</span></div>
	    													</div>
	    													<div className="products">
	    														<div className="name">亞洲萬里通里數</div>
	    														<div className="quantity">{this.state.order.asiamiles_expect}<span>里數</span></div>
	    													</div>
	    												</div>
	    												<div className="cancelText">{this.state.cancelText}</div>
	    												{
	    													this.state.status == 0 ?
	    													<div onClick={()=>this.cancelAlertClick(`${parseInt(item.wv_booking_status)}`,item.order_id)} className={`cancelBtn cancelBtn${parseInt(item.wv_booking_status)}`}>
	    														{this.state.cancelStatus[parseInt(item.wv_booking_status)] } { this.state.isCancelLoading?<IoLoadA className="loadIcon"/>:null }
	    													</div>

		    												:
		    												null
		    											}
														{this.state.status == 1 ? <div className='cancelBtn cancelBtn2'>{this.state.showStatus[parseInt(item.wv_booking_status)]}</div> : null }
	    											</div>
	    										</div>
		    									:
		    									<div>
			    									{
			    										this.state.isDetailLoading ?
			    										<div className="detailMore">
				    										<IoLoadA  className="loading"/>
				    									</div>
				    									:
				    									null
			    									}
		    									</div>

		    								}
		    								{
		    									// this.state.num == 1 ?
	    										// <div className="detailMore">
	    										// 這邊是QRcode區
	    										// </div>
		    									// :
		    									// null
		    								}
		    								{
		    									this.state.num == 1 ?
	    										<div className="detailMore">
	    											<div className="leftBox">
													{
														item.inv_no ?
														<div className="rightBox">
															<div className="provBox" style={{backgroundImage:`url(${'../../static/member/prov0.png'})`}}></div>
															<div className="text"></div>
														</div>
														:
														<div className="rightBox">
															<div className="provBox" style={{backgroundImage:`url(${'../../static/member/prov2.png'})`}}></div>
															<div className="text"></div>
														</div>
													}
	    												<div className="bookDateBox">
	    													<div className="dateTitle">購買日期</div>
	    													<div className="dateDate">
	    														<div className="month">{timeFormat.bonusDate(this.state.order.created_time).month}</div>
	    														<div className="year">{timeFormat.bonusDate(this.state.order.created_time).year}</div>
	    													</div>
	    												</div>
														<div>
	    													<div className="bookDateBox">
		    													<div className="dateTitle">發票日期</div>
		    													<div className="dateDate">
																{
																	item.inv_date?
																	<div>
																		<div className="month">{timeFormat.bonusDate(item.inv_date).month}</div>
																		<div className="year">{timeFormat.bonusDate(item.inv_date).year}</div>
																	</div>
																	:
																	<div className="month"><IoAndroidRemove className="removeIcon"/></div>
																}
		    													</div>
		    												</div>
		    												<div className="bookDateBox">
		    													<div className="dateTitle">發票號碼</div>
		    													<div className="invNum">{item.inv_no?item.inv_no:<IoAndroidRemove className="removeIcon"/>}</div>
		    												</div>
	    												</div>

	    												<div className="leftBottmBox">
	    													1. 因電影票顆徵娛樂稅,因此全台影城電影購票接不開立發票，而以票根作為購買證明，故只開立訂票手續費及餐飲發票。<br />
															2. 發票開立日期為開演後3~5天。<br />
															3. 發票尚未開立前，將不會出現購買證明標章。<br />
															4. 如取消訂票或退票，此購買證明視同失效。<br />
	    												</div>
    												</div>
	    										</div>
		    									:
		    									null
		    								}
		    							</div>
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

export default MemberRecordDetail;
