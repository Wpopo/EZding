import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { MovieInfoBoxWrapper } from '../../styled/movieInfoStyled';
import { movieStars } from '../common/scoreStars';
import timeFormat from '../common/timeFormat';
import ChangePages from '../common/changePages';
import * as movieGrade from '../common/grade';

class MovieInfoBox extends React.Component {
	constructor(props){
		super(props);

		this.pageChange = this.pageChange.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
		this.gotoPage = this.gotoPage.bind(this);

		this.state = {
			isLoading:true,
			movielist:[],
			nowIndex:1
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.movielist !== this.state.movielist && nextProps.movielist.length > 1){
			this.setState({
				movielist:nextProps.movielist,
				isLoading:false,
				nowIndex:1
			});
		}
	}

	componentDidMount(){
		this.scrollToTop(1);
	}

	pageChange(nowIndex){
		this.setState({
			nowIndex
		})
		this.scrollToTop(300);

	}

	scrollToTop(scrollDuration) {
		var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
	        if ( window.scrollY != 0 ) {
	            window.scrollBy( 0, scrollStep );
	        }
	        else clearInterval(scrollInterval);
	    },15);
	}

	gotoPage(item){
		Router.push({
            pathname:'/movieInfo',
            query:{
                movieid: item
            }
        });
	}

  	render () {
  		if(this.state.isLoading){
  			let starLoading = movieStars(0);
	  		let loadingBox = [];
	  		for(let i = 0;i<12 ;i++){
	  			loadingBox.push(
	  				<div className="post-box" key={i}>
		    			<div className="post" style={{ backgroundColor:`#2b2b2b`}}></div>
		    			<div className="star">{starLoading}</div>
		    			<div className="title" style={{ backgroundColor:`#2b2b2b`, width:'80%',boxSizing:'border-box',border:'5px solid #404040'}}></div>
		    			<div className="en" style={{ backgroundColor:`#2b2b2b`, width:'80%',boxSizing:'border-box',border:'5px solid #404040'}}></div>
		    			<div className="grade"></div>
		    		</div>
	  			);
	  		}
  			return (
			    <MovieInfoBoxWrapper>
			    	<div className="box-wrapper">
			    		{loadingBox}
			    	</div>
			    	<div className="clear"></div>
			    </MovieInfoBoxWrapper>
		    )
  		}
  		else if(this.state.movielist.length > 1){
  			let pages = Math.ceil(this.state.movielist.length/12);
			return (
			    <MovieInfoBoxWrapper>
			    	<div className="box-wrapper">
			    		{
			    			this.state.movielist.map((item,index)=>{
								let start = (this.state.nowIndex-1)*12;
								let end = this.state.nowIndex*12 - 1;

								let star = movieStars(item.ez_score);
								let date = timeFormat.newsDate2(item.release_date);

								let grade = movieGrade.gradeScore(item.grade);

								if(start <= index && index <= end){

									return (
										<div className="post-box" key={index}>
							    			{
							    				item.poster_url !== null ?
							    				<div className="post" style={{ backgroundImage:`url(${item.poster_url})`}} onClick={()=>this.gotoPage(item.movie_id)}></div>
							    				:
							    				<div className="post" style={{ backgroundImage:`url(../../static/common/poster.png)`}} onClick={()=>this.gotoPage(item.movie_id)}></div>
							    			}
							    			{this.props.coming ? <div className="coming">上映日期<span>{date}</span></div> : <div className="star">{star}</div> }
							    			<div className="title" title={item.movie_title.zh_tw}>{item.movie_title.zh_tw}</div>
							    			<div className="en" title={item.movie_title.en_us}>{item.movie_title.en_us}</div>
							    			<div className="grade">{grade}</div>
							    		</div>
									)
								}
							})
			    		}

			    	</div>
			    	<div className="page">
			    		<ChangePages pages={pages} fetchFunc={this.pageChange}/>
			    	</div>
			    	<div className="clear"></div>
			    </MovieInfoBoxWrapper>
		    )
		}else{
			return (
			    <MovieInfoBoxWrapper>
			    	<div className="box-wrapper">
			    	</div>
			    </MovieInfoBoxWrapper>
		    )
		}

  }
}



export default MovieInfoBox;
