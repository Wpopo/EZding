import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import LoadingCircle from '../common/loading';
import {MoviePriceList} from '../../styled/preferentialStyled';


class PrePricesList extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isLoading:this.props.isLoading,
			isError:this.props.isError,
			pricesList:this.props.pricesList
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isLoading !== this.state.isLoading){
			this.setState({
				isLoading:nextProps.isLoading,
			});
		}else if(nextProps.isError !== this.state.isError){
			this.setState({
				isError:nextProps.isError,
			});
		}
		// 抓不到上層傳下來的值，所以把 priceslist 單獨拉出來寫
		if(nextProps.pricesList !== this.state.pricesList){
			this.setState({
				pricesList:nextProps.pricesList
			});
		}
	}


  	render () {
		if(this.state.isLoading){
			return(
				<MoviePriceList >
					<LoadingCircle height={"500px"}/>
				</MoviePriceList>
			)
		}else if(this.state.pricesList){
			//整理api資料
			let locationArray = new Array();
			let cinemaArray = new Array();
			let alllist = this.state.pricesList;
			for(let i = 1; i < 15; i++){
				cinemaArray = alllist.filter(function(item, index, array){
					return item.location == i;
				});
				locationArray.push(cinemaArray);
			}

			return(
					<MoviePriceList blockValue={this.props.blockValue}>
						{ alllist.length !== 0 ?
							<div>
								<ul className="menuTitle">
									<li>地區</li>
									<li>影城</li>
									<li>線上刷卡優惠價</li>
									{this.props.blockValue !== 1 ? <li>原價</li> : null}

								</ul>
								<div className="priceGroup">
									{
										locationArray.map((item,index)=>{
										let locationSpe = ["台北","桃園","新竹","台中","台南","高雄","屏東","宜蘭","苗栗","基隆","花蓮","台東","澎湖","金門"];
										if(item.length >0){
											return(
												<div className="group" key={index}>
													<div className="area">{locationSpe[index]}</div>
													<div className="detailList">
														{
															this.props.blockValue === 1 ?
																item.map((child,key)=>{
																	return(
																		<ul className="location" key={key}>
																			<li>{child.cinema_name.zh_tw}</li>
																			<li><div className="box">自付額<span>{child.price}元</span></div></li>
																		</ul>
																	)
																})
															:
															item.map((child,key)=>{
																return(
																		<ul className="location" key={key}>
																			<li>{child.cinema_name.zh_tw}</li>
																			<li><div className="box">紅利點數<span>{child.point}點</span> + 自付額<span>{child.price}元</span></div></li>
																			<li>{child.cinema_price}元</li>
																		</ul>
																	)
																})
															}
														</div>
													</div>
												);
											}
										})
									}
								</div>
							</div>
							:
							<div className="emptyArea">
								<img className="emptyImg" src={'/static/common/preferential-empty-table.png'}></img>
								<a>此卡別無合作優惠</a>
							</div>
						}
					</MoviePriceList>
			)
		}else if(this.state.isError){
			return(
				<MoviePriceList >
					isError
				</MoviePriceList>
			)
		}else{
			return(
				<MoviePriceList>
						is
				</MoviePriceList>
			)
		}
	}
}


export default PrePricesList;
