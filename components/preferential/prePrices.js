import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import {MoviePrice} from '../../styled/preferentialStyled';
import PrePricesList from './prePricesList';
import * as activityAPI from '../../actions/activityAPI';

class PrePrices extends React.Component {
	constructor(props){
		super(props);

		this.getPrice = this.getPrice.bind(this);
		this.btnClick = this.btnClick.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			forPrice:[]
		}
	}

	//抓取 2D(movie_version = 2) 或 3D(movie_version = 3)價格
	getPrice(val){
		this.setState({
			isLoading:true
		});

		let parentPaymentID = this.props.parentPaymentID;
		let movie_version = val;

		activityAPI.getprice_2D_3D(parentPaymentID, movie_version)
		.then(result=>{
			if(result.result.list == null){
				this.setState({
					isLoading:false,
					forPrice:[]
				});
			}else{
				this.setState({
					isLoading:false,
					forPrice:result.result.list
				});
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true
			});
		})
	}


	//active color change
	btnClick(value){

		let items = document.getElementsByClassName('rank-btn');

		for(let i = 0 ; i < 2 ; i++){
			items[i].classList.remove('checked');
		}

		items[value].classList.add('checked');

		// val 1 取得 3D的價格
		if(value === 1){
			this.getPrice(3);
		}else{
			this.getPrice(2);
		}
	}

	componentDidMount(){
		this.btnClick(0);
		//this.getPrice(2);
	}

  	render () {
			if(this.state.isLoading){
				return (
					<MoviePrice>
						<div className="wrapper">
							<div className="rank-btn" onClick={()=>this.btnClick(0)}>2D影片價格</div>
							<div className="rank-btn" onClick={()=>this.btnClick(1)}>3D影片價格</div>
						</div>

						<div className="price-part">
							<PrePricesList isLoading={this.state.isLoading} isError={this.state.isError}/>
						</div>
					</MoviePrice>
				)
			}
			else if(this.state.forPrice){
				return (
					<MoviePrice>
						<div className="wrapper">
							<div className="rank-btn" onClick={()=>this.btnClick(0)}>2D影片價格</div>
							<div className="rank-btn" onClick={()=>this.btnClick(1)}>3D影片價格</div>
						</div>

						<div className="price-part">
							<PrePricesList blockValue={this.props.blockValue} pricesList={this.state.forPrice} isLoading={false} isError={false}/>
						</div>
					</MoviePrice>
				)
			}
			else if(this.state.isError){
				return (
					<MoviePrice>
						<div className="wrapper">
							<div className="rank-btn" onClick={()=>this.btnClick(0)}>2D影片價格</div>
							<div className="rank-btn" onClick={()=>this.btnClick(1)}>3D影片價格</div>
						</div>

						<div className="price-part">
							<PrePricesList isLoading={this.state.isLoading} isError={this.state.isError}/>
						</div>
					</MoviePrice>
				)
			}
		}
	}



export default PrePrices;
