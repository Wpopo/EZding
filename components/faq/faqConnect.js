import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { FAQConnectWrapper } from '../../styled/faqStyled';

class FAQConnect extends React.Component {

  	render(){

	    return (
	    	<FAQConnectWrapper>
				<div>客服信箱&emsp;<a href="mailto:service@fullerton.com.tw">service@fullerton.com.tw</a></div>
				<a>客服專線&emsp;(02)8912-6600</a><br/>
				<a>服務時間&emsp;週一～週六 09:00～21:00</a><br/>
				<a>週日及國定假日&emsp;09:00～18:00</a><br/>
	    	</FAQConnectWrapper>
	    )
  	}
}

export default FAQConnect;
