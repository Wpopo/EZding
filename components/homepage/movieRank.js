import React from 'react';
import Link from 'next/link';
import { MovieRankWrapper , Clearfix} from '../../styled/homePageStyled';
import MovieRankImages from './movieRankImages';

//API
import * as movieAPI from '../../actions/movieAPI';

class MovieRank extends React.Component {
	constructor(props){
		super(props);

		this.btnClick = this.btnClick.bind(this);
		this.getHotMovie = this.getHotMovie.bind(this);
		this.getComingMovies = this.getComingMovies.bind(this);
		this.getWebMovies = this.getWebMovies.bind(this);
		this.renderClass = this.renderClass.bind(this);


		this.state = {
			isLoading:true,
			isError:false,
			blockValue:0,
			movielist:this.props.movielist,//現正熱映, 即將上映, 網路熱議
		}
	}

 	//active color change
	btnClick(value){

		if( value == 1 ){
			this.getWebMovies();
		}else if( value == 2){
			this.getComingMovies();
		}else{
			this.getHotMovie();
		}


		this.setState({
			blockValue:value
		});

		let items = document.getElementsByClassName('rank-btn');

		for(let i = 0 ; i < 3 ; i++){
			items[i].classList.remove('checked');
		}

		items[value].classList.add('checked');

	}

	componentDidMount(){
		this.btnClick(0);

	}

	//現正熱映
	getHotMovie(){
		this.setState({
			isLoading:true
		});

		let page_size = 10;
		let page = 1;

		movieAPI.movieRankHot(page,page_size)
		.then(result=>{

			if(result.result.list == null || result.result.list.length == 0){
				this.setState({
					isLoading:false,
					isError:true,
					movielist:[]
				});
			}else{
				this.setState({
					isLoading:false,
					isError:false,
					movielist:result.result.list
				});
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true,
				movielist:[]
			});
		});
	}


	//即將上映
	getComingMovies(){
		this.setState({
			isLoading:true
		});

		let page = 1;
		let page_size = 10;

		movieAPI.movieRankComing(page,page_size)
		.then(result=>{
			if(result.result.list == null || result.result.list.length == 0){
				this.setState({
					isLoading:false,
					isError:true,
					movielist:[]
				});
			}else{
				this.setState({
					isLoading:false,
					isError:false,
					movielist:result.result.list
				});
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true,
				movielist:[]
			});
		});
	}

	//網路熱映
	getWebMovies(){
		this.setState({
			isLoading:true
		});

		let page = 1;
		let page_size = 10;

		movieAPI.movieRankWeb(page,page_size)
		.then(result=>{

			if( result.result.list == null || result.result.list.length == 0){
				this.setState({
					isLoading:false,
					isError:true,
					movielist:[]
				});
			}else{
				this.setState({
					isLoading:false,
					isError:false,
					movielist:result.result.list
				});
			}
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true,
				movielist:[]
			});
		});
	}

	renderClass(){
		return(
			<div className="wrapper">
	    		<div className="rank-btn" onClick={()=>this.btnClick(0)}>現正熱映</div>
		    	<div className="rank-btn" onClick={()=>this.btnClick(1)}>網路熱議</div>
		    	<div className="rank-btn" onClick={()=>this.btnClick(2)}>即將上映</div>
	    	</div>
		)
	}

	render () {
		if(this.state.isLoading){
			return (
			    <MovieRankWrapper >
			    	{this.renderClass()}

			    	<div className="rank-part">
			    		<MovieRankImages isLoading={this.state.isLoading} isError={this.state.isError}/>
			    	</div>
			    </MovieRankWrapper>
			)
		}
		else if(this.state.movielist.length > 0){
			return (
			    <MovieRankWrapper >
			    	{this.renderClass()}

			    	<div className="rank-part">
			    		{this.state.blockValue === 0 ? <MovieRankImages movielist={this.state.movielist} isLoading={this.state.isLoading} isError={this.state.isError}/> : null}
			    		{this.state.blockValue === 1 ? <MovieRankImages movielist={this.state.movielist} isLoading={this.state.isLoading} isError={this.state.isError}/> : null}
			    		{this.state.blockValue === 2 ? <MovieRankImages movielist={this.state.movielist} isLoading={this.state.isLoading} isError={this.state.isError}/> : null}
			    	</div>
			    </MovieRankWrapper>
			)
		}
		else if(this.state.isError || this.state.movielist.length == 0 ){
			return (
			    <MovieRankWrapper >
			    	{this.renderClass()}

			    	<div className="rank-part">
			    		<MovieRankImages isLoading={this.state.isLoading} isError={this.state.isError}/>
			    	</div>
			    </MovieRankWrapper>
			)
		}
	}
}



export default MovieRank;
