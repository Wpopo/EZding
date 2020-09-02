import React from 'react';
import Router from 'next/router';
import { Clearfix ,MovieInfoContentWrapper } from '../../styled/movieInfoStyled';
import MovieInfoBox from './movieInfoBox';

import * as movieAPI from '../../actions/movieAPI';

class MovieInfoContent extends React.Component {
	constructor(props){
		super(props);

		this.select = this.select.bind(this);
		this.renderTitle = this.renderTitle.bind(this);
		this.getHotMovie = this.getHotMovie.bind(this);
		this.getComingMovies = this.getComingMovies.bind(this);

		this.state = {
			isLoading:true,
			movielist:[],
			checked:true,
		}
	}
	componentDidMount(){
		this.select(this.state.checked);
	}

	//現正熱映
	getHotMovie(page){
		let page_size = 50;

		movieAPI.movieRankHot(page,page_size)
		.then(result=>{

			if(result.result.total_records == 0){
				this.setState({
					isLoading:false
				},()=>{
					Router.push('/');
				});
			}else if(result.result.total_pages !== result.result.page){

				let movielist = this.state.movielist;
				movielist = movielist.concat(result.result.list);

				this.setState({
					movielist
				},()=>{
					this.getHotMovie(result.result.page + 1);
				})
			}else{

				let movielist = this.state.movielist;
				movielist = movielist.concat(result.result.list);

				this.setState({
					isLoading:false,
					movielist
				})
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false
			},()=>{
				Router.push('/');
			});
		});
	}

	//即將上映
	getComingMovies(){
		let page = 1;
		let page_size = 50;

		movieAPI.movieRankComing(page,page_size)
		.then(result=>{

			if(result.result.list == null || result.result.list.length == 0){
				this.setState({
					isLoading:false
				},()=>{
					Router.push('/');
				});
			}else{
				this.setState({
					isLoading:false,
					movielist:result.result.list
				});
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false
			},()=>{
				Router.push('/');
			});
		});
	}

	select(value){
		this.setState({
			checked:value,
			isLoading:true,
			movielist:[]
		},()=>{
			if(value){
				this.getHotMovie(1);
			}else{
				this.getComingMovies();
			}
		});

	}

	renderTitle(){
		return(
			<div className="wrapper">
	    		<div className="btn" onClick={()=>this.select(true)}>現正熱映</div>
	    		<div className="btn2" onClick={()=>this.select(false)}>即將上映</div>
	    		<div className="checked">
	    			<div className="bar"></div>
	    		</div>
	    	</div>
		)
	}

  	render () {
  		if(this.state.isLoading){
  			return (
			    <MovieInfoContentWrapper checked={this.state.checked}>
			    	{this.renderTitle()}
			    	<MovieInfoBox movielist={this.state.movielist}/>

			    </MovieInfoContentWrapper>
		    )
  		}
  		else if(this.state.movielist.length > 0){
			return (
			    <MovieInfoContentWrapper checked={this.state.checked}>
			    	{this.renderTitle()}
			    	<MovieInfoBox movielist={this.state.movielist} coming={!this.state.checked}/>
			    </MovieInfoContentWrapper>
		    )
		}else{
			return (
			    <MovieInfoContentWrapper checked={this.state.checked}>
			    	{this.renderTitle()}
			    </MovieInfoContentWrapper>
		    )
		}

  }
}



export default MovieInfoContent;
