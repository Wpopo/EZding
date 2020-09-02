import React from 'react';
import Router from 'next/router';
import { MovieDescWrapper , Clearfix } from '../../styled/movieInfoStyled' 




class MovieDesc extends React.Component {
	constructor(props){
		super(props);

		this.gotoTimePage = this.gotoTimePage.bind(this);


	}
	gotoTimePage(){
		this.props.choiceClick(0);
	}

	render(){

		return(
			<MovieDescWrapper order={this.props.movie.order_availible}>
				<div className="gotoTimePage" onClick={this.gotoTimePage}><img src="../../static/movieInfo/tickets.svg" /></div>
				<div className="wrapper">
					<div className="staffbox">
						<div className="movie-intro-staff">導演</div>
			    		{	
			    			this.props.staff1.map((item,index)=>{
			    				return index !== this.props.staff1.length - 1 ? <span className="staff" key={index}>{item} ，</span> : <span className="staff" key={index}>{item}</span>;
			    			})
			    		}
					</div>
		    		<div className="clear"></div>
		    		
		    		<div className="staffbox">
			    		<div className="movie-intro-staff">演員</div>
			    		<div className="staffContent">
			    		{	
			    			this.props.staff2.map((item,index)=>{
			    				return index !== this.props.staff2.length - 1 ? <span className="staff" key={index}>{item} ，</span> : <span className="staff" key={index}>{item}</span>;
			    			})
			    		}
			    		</div>
			    	</div>
			    	<div className="clear"></div>
		    		<div className="movie-intro-content">{this.props.movie.movie_description}</div>		    	
		    	</div>
			</MovieDescWrapper>
		)
	}
}

export default MovieDesc;