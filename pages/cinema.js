import React from 'react';
import Link from 'next/link';
import { BookingDialogWrapper , FindBtn , ChoiceFindBtn , Clearfix, ChoiceLocationCinema, ChoiceSeatCinema, MobileBtn} from '../styled/bookingDialogStyled';

import GoPlus from 'react-icons/lib/go/plus';
import GoDash from 'react-icons/lib/go/dash';
import Empty from '../components/common/empty';
import HeadMeta from '../components/headMeta';
import Router from 'next/router';
import UrlChange from '../components/common/urlChange';


class ChosseCinema extends React.Component {
    constructor(props){
        super(props);

        this.choiceCinema = this.choiceCinema.bind(this);
        this.rwdMovieCinema = this.rwdMovieCinema.bind(this);


        this.state = {
            movieToCinemas:[],
            cinemasArea:[],
            isLoading: true,
            isRwdCinemaShow:[false,false,false,false],
            emptyPartList:[],
            emptyPart:[
				{ location : '台北' , num : 1 },
				{ location : '桃園' , num : 2 },
				{ location : '新竹' , num : 3 },
				{ location : '台中' , num : 4 },
				{ location : '台南' , num : 5 },
				{ location : '高雄' , num : 6 },
				{ location : '屏東' , num : 7 },
				{ location : '宜蘭' , num : 8 },
				{ location : '苗栗' , num : 9 }
			],
            isCinemaShow: true,
            visible:false
        }
    }

    componentDidMount(){
        this.doRender();

        this.scrollToTop(1);
		Router.onRouteChangeStart = url => {
			this.setState({
				visible:true
			})
		}
		Router.onRouteChangeComplete = url => {
			this.setState({
				visible:false
			})
		}
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

    doRender = ()=>{
        let allData = [{"location":1,"cinema_list":[{"cinema_id":"4c163aba9c5311e494ae8b4ddf78b93a","cinema_name":{"zh_tw":"台北新民生戲院","en_us":null},"cinema_code":null},{"cinema_id":"cf2b5aa8132f11e6b767a1b123456789","cinema_name":{"zh_tw":"台北新光影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f55532606b5","cinema_name":{"zh_tw":"喜滿客絕色影城","en_us":null},"cinema_code":null},{"cinema_id":"5f60dacd-45b3-102d-8d74-e400529c","cinema_name":{"zh_tw":"台北京站威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"46efa950eafa11e38b12987bdb90dba4","cinema_name":{"zh_tw":"台北樂聲影城","en_us":null},"cinema_code":null},{"cinema_id":"e8bf57d61edb11e9a245782bcb259cad","cinema_name":{"zh_tw":"花蓮新天堂樂園威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"73544d843cd311e69bb83d0f96c001c2","cinema_name":{"zh_tw":"林口MITSUI OUTLET PARK威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"e9c365f27f4e11e494ae8b4ddf78b93a","cinema_name":{"zh_tw":"台北in89豪華數位影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5566201ba4","cinema_name":{"zh_tw":"台北華威天母影城","en_us":null},"cinema_code":null},{"cinema_id":"c072c5c43fc011e9a245782bcb259cad","cinema_name":{"zh_tw":"喜樂時代影城永和店","en_us":null},"cinema_code":null},{"cinema_id":"737ece862a0111e18e86000bdb90dba4","cinema_name":{"zh_tw":"板橋大遠百威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5550201811","cinema_name":{"zh_tw":"哈拉影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f551a8a48c3","cinema_name":{"zh_tw":"台北日新威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f31210ada0f55676b1bbc","cinema_name":{"zh_tw":"台北美麗華大直影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f54e85f0f78","cinema_name":{"zh_tw":"喜滿客京華影城","en_us":null},"cinema_code":null}]},{"location":2,"cinema_list":[{"cinema_id":"c256b670b10811e8959e782bcb259cad","cinema_name":{"zh_tw":"桃園統領威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"4fdedaeaf16b11dfacdd000bdb90dba4","cinema_name":{"zh_tw":"桃園美麗新台茂影城","en_us":null},"cinema_code":null},{"cinema_id":"5d4b59f567ac11e7a6b1061be09fe071","cinema_name":{"zh_tw":"桃園in89統領影城","en_us":null},"cinema_code":null}]},{"location":3,"cinema_list":[{"cinema_id":"4f9fbbac7a2d11e18e86000bdb90dba4","cinema_name":{"zh_tw":"新竹巨城威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5573651ca2","cinema_name":{"zh_tw":"新竹大遠百威秀影城","en_us":null},"cinema_code":null}]},{"location":4,"cinema_list":[{"cinema_id":"7ff29bea908122e9060e893bcb360cad","cinema_name":{"zh_tw":"台中豐原in89豪華影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5576601cdc","cinema_name":{"zh_tw":"台中Tiger City威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"84599c0a220d11e18e86000bdb90dba4","cinema_name":{"zh_tw":"台中大遠百威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"5307fea6405811e392f7000bdb90dba4","cinema_name":{"zh_tw":"台中華威台中影城","en_us":null},"cinema_code":null},{"cinema_id":"9fa318f9c99f4f6987a46efc5e3f50f2","cinema_name":{"zh_tw":"台中新光影城","en_us":null},"cinema_code":null}]},{"location":5,"cinema_list":[{"cinema_id":"40288eb0050f542401050f557dfc1d65","cinema_name":{"zh_tw":"台南大遠百威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"c3ab0cdc8cad11e494ae8b4ddf78b93a","cinema_name":{"zh_tw":"台南南紡威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"6ff18bea897011e8959e782bcb259cad","cinema_name":{"zh_tw":"澎湖in89豪華影城","en_us":null},"cinema_code":null},{"cinema_id":"370b0003943222e8a7b2172be10fe182","cinema_name":{"zh_tw":"台南FOCUS威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"a6f9c512bec5463183d3d7eaec37fb42","cinema_name":{"zh_tw":"台南新光影城","en_us":null},"cinema_code":null}]},{"location":6,"cinema_list":[{"cinema_id":"44f76448bf2511e59a5d4b53bcb866d6","cinema_name":{"zh_tw":"高雄in89駁二電影院","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5582141dac","cinema_name":{"zh_tw":"高雄大遠百威秀影城","en_us":null},"cinema_code":null},{"cinema_id":"40288eb0050f542401050f5581582dc5","cinema_name":{"zh_tw":"喜滿客夢時代影城","en_us":null},"cinema_code":null}]},{"location":9,"cinema_list":[{"cinema_id":"883ddebefe9e11e49e5e8d16c6a1d23a","cinema_name":{"zh_tw":"頭份尚順威秀影城","en_us":null},"cinema_code":null}]}]


        let movieToCinemas = [];
        let movieToCinemaPart_N = [];
        let movieToCinemaPart_T = [];
        let movieToCinemaPart_C = [];
        let movieToCinemaPart_S = [];

        let cinemasArea = [];


        allData.map((item, index)=>{
            if(item.location === 1 || item.location === 8 || item.location === 10){
                item.cinema_list.map((sigle, key)=>{
                    return movieToCinemaPart_N.push({id:sigle.cinema_id, name:sigle.cinema_name.zh_tw});
                })

            }else if(item.location === 2 || item.location === 3 || item.location === 9){
                item.cinema_list.map((sigle, key)=>{
                    return movieToCinemaPart_T.push({id:sigle.cinema_id, name:sigle.cinema_name.zh_tw});
                })

            }else if(item.location === 4){
                item.cinema_list.map((sigle, key)=>{
                    return movieToCinemaPart_C.push({id:sigle.cinema_id, name:sigle.cinema_name.zh_tw});
                })

            }else if(item.location === 5 || item.location === 6 || item.location === 7){
                item.cinema_list.map((sigle, key)=>{
                    return movieToCinemaPart_S.push({id:sigle.cinema_id, name:sigle.cinema_name.zh_tw});
                })
            }
        });


        if(movieToCinemaPart_N.length !== 0){
            movieToCinemas.push(movieToCinemaPart_N);
            cinemasArea.push("北區");
        }

        if(movieToCinemaPart_T.length !== 0){
            movieToCinemas.push(movieToCinemaPart_T);
            cinemasArea.push("桃竹苗");
        }

        if(movieToCinemaPart_C.length !== 0){
            movieToCinemas.push(movieToCinemaPart_C);
            cinemasArea.push("中區");
        }

        if(movieToCinemaPart_S.length !== 0){
            movieToCinemas.push(movieToCinemaPart_S);
            cinemasArea.push("南區及離島");
        }

        this.setState({
            cinemasArea: cinemasArea,
            movieToCinemas: movieToCinemas,
            isLoading: false,
            emptyPartList: allData
        });

    }

    choiceCinema(data){

		sessionStorage.setItem('cinemaname',data.name);
		sessionStorage.setItem('cinemaid',data.id);
		Router.push({
			pathname:'/booking',
			query:{
				movieid:'f5aba6920cd048798e24336ab95491ac',
				cinemaid:data.id,
			}
		});

	}

    rwdMovieCinema(index){
		let cinemaBox = document.getElementsByClassName('box')[index].classList;
		let title = document.getElementsByClassName('rwd-title')[index].classList;
		let isRwdCinemaShow = this.state.isRwdCinemaShow;
		if(cinemaBox.contains('box-hide')){
			cinemaBox.remove('box-hide');
			title.add('rwd-title-color');
			isRwdCinemaShow[index] = true;

			this.setState({
				isRwdCinemaShow
			});
		}else{
			cinemaBox.add('box-hide');
			title.remove('rwd-title-color');
			isRwdCinemaShow[index] = false;
			this.setState({
				isRwdCinemaShow
			});
		}
	}


    render(){

        if(this.state.isLoading){
            return(
                <div>
                    {this.state.visible ? <UrlChange /> : null }
                    <HeadMeta/>
                    <div style={{  backgroundColor: '#404040',width: '100vw', height: '100vh'}}></div>
                </div>
                )

        }else{
            return (
                <div>
                    {this.state.visible ? <UrlChange /> : null }
                    <HeadMeta/>
    				<BookingDialogWrapper loc>
    					<div className="wrapper">

    						<div className="movie-name">
    							<h1 className="title" onClick={this.props.gotowhere} title={"復仇者聯盟4：終局之戰"}>復仇者聯盟4：終局之戰</h1>

    						</div>

    						<Clearfix />

    						<div className="find-part">
    							<FindBtn onClick={this.cinemaClick} choice={this.state.isCinemaShow}>影城</FindBtn>
    						</div>
    						<ChoiceFindBtn choice={this.state.isCinemaShow}>
    							<div className="choice-right"></div>
    						</ChoiceFindBtn>

    						<div className="mobileGroup">
    							<MobileBtn onClick={this.mobileClickCinema} mobileShow={this.state.isMobileCinemaShow}>找影城

    							</MobileBtn>
    							<div className="mobileCinema" style={{display:"block"}}>
    								<ChoiceLocationCinema>
    								{

    									<div className="wrapper">
    										{
    											this.state.cinemasArea.map((item,index)=>{

    												return(
    													<div className="rwd-loc-part" key={index}>
    														<h3 className="rwd-title" onClick={()=>this.rwdMovieCinema(index)}>{item}
    														{
    															this.state.isRwdCinemaShow[index]? <GoDash className="icon"/>:<GoPlus className="icon"/>
    														}
    														</h3>

    														<div className="box box-hide">
    														{
    															this.state.movieToCinemas[index].map((cinema, key)=>{
    																return(
    																	<div className="rwd-cinema" key={key} onClick={()=>this.choiceCinema(cinema)}>{cinema.name}</div>
    																)
    															})
    														}
    														</div>
    													</div>
    												)
    											})
    										}
    										<Clearfix />
    									</div>

    								}
    								</ChoiceLocationCinema>
    							</div>


    							<div className="mobileEmptySeat">
    								<ChoiceSeatCinema>
    									{
    										<div className="area" >
    										{
    											this.state.emptyPartList.map((item, index)=>{
    												return (
    													this.state.emptyPart.map((loc, key)=>{
    														if(item.location == loc.num){
    															return(
    																<div className="rwd-location" key={key} onClick={()=>this.choiceLocation(loc.num)}>{loc.location}</div>
    															)

    														}
    													})
    												)
    											})
    										}
    										</div>

    									}
    								</ChoiceSeatCinema>
    							</div>
    							<div className="mobileSpace"></div>
    						</div>
    						<ChoiceLocationCinema>
    						{
    							this.state.isCinemaShow ?
    							<div className="wrapper ">
    								 {
    									 this.state.cinemasArea.map((item, index)=>{
    										 return(
    											 <div className="loc-part" key={index}>
    				 								<h3 className="big-title">{item}</h3>
    				 								<Clearfix />
    												{
    													this.state.movieToCinemas[index].map((cinema, key)=>{
    														return(
    															<div className="cinema" key={key} onClick={()=>this.choiceCinema(cinema)}>{cinema.name}</div>
    														)
    													})
    												}
    			                                </div>
    										 )
    								 	})
    								 }
    								<Clearfix />
    							</div>
    							:
    							null
    						}
    						</ChoiceLocationCinema>

    						<ChoiceSeatCinema>
    							{
    								this.state.isSeatShow ?
    								<div className="area" >
    								{
    									this.state.emptyPartList.map((item, index)=>{
    										return (
    											this.state.emptyPart.map((loc, key)=>{
    												if(item.location == loc.num){
    													return(
    														<div className="location" key={key} onClick={()=>this.choiceLocation(loc.num)}>{loc.location}</div>
    													)

    												}
    											})
    										)
    									})
    								}
    								</div>
    								:
    								null
    							}
    						</ChoiceSeatCinema>
    				 	</div>
    				 </BookingDialogWrapper>

                </div>

            )



        }
    }
}

export default ChosseCinema;
