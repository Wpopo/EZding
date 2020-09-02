import React from 'react';
import IoLoadA from 'react-icons/lib/io/load-a';
import { LoadingCircleWrapper } from '../../styled/commonStyled';




export default class LoadingCircle extends React.Component { 
	render(){
		return (
			<LoadingCircleWrapper height={this.props.height}>
				<IoLoadA  className="loadingIcon"/>
			</LoadingCircleWrapper>
		)
	}


}