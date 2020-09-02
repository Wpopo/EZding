import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { GuideWrapper } from '../../styled/guideStyled';
import GuideTitle from "./guideTitle";
import GuideDiscount from "./guideDiscount";
import StepByStep from "./stepByStep";
import GuideSocial from "./guideSocial";

class GuideContent extends React.Component {


  	render () {

	    return (
		    <GuideWrapper>
                <GuideTitle/>
                <GuideDiscount/>
                <StepByStep/>
                <GuideSocial/>
		    </GuideWrapper>
	    )
  }
}

export default GuideContent;
