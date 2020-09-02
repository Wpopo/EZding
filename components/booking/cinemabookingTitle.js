import React from 'react';
import Link from 'next/link';
import { CinemaEntryWrapper } from '../../styled/bookingStyled';



class CinemabookingTitle extends React.Component {
	



  	render () {

	    return (
		    <CinemaEntryWrapper>
		    	<div className="wrapper">
		    		<div className="cinematitle">{this.props.cinemainfo.cinema_name.zh_tw}</div>
		    		<div className="info-part">
		    			<span className="red">地址：</span>
		    			<span>{this.props.cinemainfo.address}</span>
		    		</div>
		    		<div className="info-part">
		    			<span className="red">電話：</span>
		    			<span>{this.props.cinemainfo.phone}</span>
		    		</div>
		    	</div>
		    </CinemaEntryWrapper>
	    )
  	}
}



export default CinemabookingTitle;