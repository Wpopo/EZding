import React from 'react';
import GoAlert from 'react-icons/lib/go/alert';
import { EmptyWrapper } from '../../styled/commonStyled';




export default class Empty extends React.Component { 
	render(){
		return (
			<EmptyWrapper height={this.props.height}>
				<GoAlert  className="empty"/>
				<div className="emptyText">系統忙碌中，請重新加載頁面</div>
			</EmptyWrapper>
		)
	}


}