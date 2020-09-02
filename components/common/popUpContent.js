import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import {PopUpContentSec} from '../../styled/commonStyled';
import IoIosCloseEmpty from 'react-icons/lib/io/ios-close-empty';


class PopUpContent extends React.Component {
	constructor(props){
		super(props);

	}

  	render () {
	    return (
				<PopUpContentSec>
					<div className="overlay" onClick={this.props.popUpOpen}></div>
					<div className="contentWrapper">
						{
							this.props.visiblePopUp ?
							<div>
								<div className="cancelBox">
									<IoIosCloseEmpty className="cancel-icon" onClick={this.props.popUpOpen}/>
								</div>
								<div>
									{this.props.showUi()}
								</div>
							</div>
							:
							null
						}
					</div>
			</PopUpContentSec>
	    )
  	}
}


export default PopUpContent;
