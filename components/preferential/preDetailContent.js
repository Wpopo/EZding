import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import {PreContentSec} from '../../styled/preferentialStyled';
import MdClear from 'react-icons/lib/md/clear';
import PrePrices from './prePrices';
import * as activityAPI from '../../actions/activityAPI';


class PreDetailContent extends React.Component {
	constructor(props){
		super(props);

		this.getDetailPlan = this.getDetailPlan.bind(this);

		this.state = {
			paymentDesc:[],
			paymentName:"",
			parentPaymentID:this.props.checked
		}
	}

	//帶入上層傳入的payment_id
	getDetailPlan(){

		let parentIDChecked = this.props.checked;

		activityAPI.getparentID(parentIDChecked)

		.then(result =>{
			let data = Object.values(result);

			var cheerio = require('cheerio'),
			$ = cheerio.load(data[0].payment_desc);

			const length = $("font").length;
			const paymentDesc = this.state.paymentDesc;

			for(let i = 0 ; i < length ; i++){

				let ownColor = $("font")[i].attribs.color;
				let children = $("font")[i].children;

		        children.map((item,index)=>{
		            paymentDesc.push(<div key={index + Math.random()} style={{ color: ownColor }}>{item.data}</div>);
		        })
			}


			this.setState({
				paymentName:data[0].payment_name,
				paymentDesc
			});

		})
		.catch(error=>{

		})
	}


	componentDidMount(){
		this.getDetailPlan();
	}


  	render () {
	    return (
				<PreContentSec>
					<div className="overlay"></div>
					<div className="contentWrapper">
						<MdClear className="cancel-icon" onClick={this.props.preDialog} />
						{	//show bank data
							this.props.checked ?
							<div>
								<h4>{this.state.paymentName}</h4>
								<h5>優惠適用資格：</h5>
								<span>{this.state.paymentDesc}</span>
								<PrePrices parentPaymentID={this.state.parentPaymentID}/>
							</div>

							:
							null
						}
					</div>
				</PreContentSec>
	    )
  	}
}



export default PreDetailContent;
