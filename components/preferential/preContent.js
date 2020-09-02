import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { PreferentialWrapper } from '../../styled/preferentialStyled';

class PreContent extends React.Component {
	

  	render () {

	    return (
		    <PreferentialWrapper>
		    	<div className="wrapper">
		    		PreferentialContent
		    	</div>
		    </PreferentialWrapper>
	    )
  }
}



export default PreContent;