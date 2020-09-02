import React from "react";
import { LoadingBox } from '../../styled/commonStyled';


export default class LoadingBoxFB extends React.Component {
	render(){
		return (
            <LoadingBox width={this.props.width} height={this.props.height} margin={this.props.margin} size={this.props.size} midWidth={this.props.midWidth} smallWidth={this.props.smallWidth} smallHeight={this.props.smallHeight} smallMargin={this.props.smallMargin}>
                <div className="background-masker top"></div>
                <div className="background-masker second"></div>
                <div className="background-masker left"></div>
                <div className="background-masker third"></div>
                <div className="background-masker right"></div>
           </LoadingBox>
		)
	}
}
 