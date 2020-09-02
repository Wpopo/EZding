import React from 'react';
import { MovieVideoWrapper } from '../../styled/movieInfoStyled'
import MdClose from 'react-icons/lib/md/close';


class MovieVideo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<MovieVideoWrapper>
				<MdClose className="icon" onClick={()=>this.props.videoShow()}/>
				<div className="wrapper">
					<iframe width="560" height="315" src={this.props.video+ '?autoplay=1'} frameBorder="0" allowFullScreen></iframe>
				</div>
			</MovieVideoWrapper>
		)
	}
}

export default MovieVideo;
