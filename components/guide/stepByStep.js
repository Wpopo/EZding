import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { StepByStepWrapper } from '../../styled/guideStyled';
import ReactSlider from 'react-slick';

class StepByStep extends React.Component {
    constructor(props){
        super(props);
        this.mouseEnter = this.mouseEnter.bind(this);

        this.state = {
			imgLink:"",
            settings:{
				dots:false,
				infinite: true,
				speed: false,
				arrows:true,
				autoplay: false,
				pauseOnHover:true
			}
		}
    }

    mouseEnter(value) {
        if(value === 0){
            this.setState({
                imgLink:"../../static/guide/a-special.gif"
            });
        }else if(value === 1){
            this.setState({
                imgLink:"../../static/guide/b-special.gif"
            });
        }else if(value === 2){
            this.setState({
                imgLink:"../../static/guide/c-special.gif"
            });
        }else{
            this.setState({
                imgLink:"../../static/guide/d-special.gif"
            });
        }

        let items = document.getElementsByClassName('stepCircle');
        for(let i=0; i<4; i++){
            items[i].classList.remove('checked');
        }
        items[value].classList.add('checked');
    }


    componentDidMount(){
        this.mouseEnter(0);
    }



  	render () {
        const settings = this.state.settings;
	    return (
		    <StepByStepWrapper>
                <div className="stepByStepWrap">
                <div className="stepTitleWrap">
                    <img className="stepTitle" src="/static/guide/stepBg.svg"/>
                    <a>特色功能</a>
                </div>
                <p className="stepMiddle">超快速、便利的訂電影體驗，跨影城搜尋找場次、免排隊、自選最佳好座位！每週三搶先開放新場次預定～</p>
                <div className="stepChoose">
                    <div className="stepChoose-left">
                        <div className="stepCircleZone">
                            <a className="stepCircle" onMouseEnter={()=>this.mouseEnter(0)}></a>
                            <div className="stepline"></div>
                            <a className="stepCircle" onMouseEnter={()=>this.mouseEnter(1)}></a>
                            <div className="stepline"></div>
                            <a className="stepCircle" onMouseEnter={()=>this.mouseEnter(2)}></a>
                            <div className="stepline"></div>
                            <a className="stepCircle" onMouseEnter={()=>this.mouseEnter(3)}></a>
                        </div>
                        <div className="stepWord">
                            <div className="stepSec">
                                <a>跨影城搜尋</a>
                                <p>快速比對各影城上映時刻<br/>尋找最適合你的場次、空位</p>
                            </div>
                            <div className="stepSec">
                                <a>選好位</a>
                                <p>於座位圖直接點選想要的位置<br/>場次劃位狀況一目了然</p>
                            </div>
                            <div className="stepSec">
                                <a>線上訂票</a>
                                <p>提供會員紅利優惠、信用卡優惠、<br/>原價票等方式購票</p>
                            </div>
                            <div className="stepSec">
                                <a>序號取票</a>
                                <p>至影城現場憑序號取票<br/>同步以簡訊、E-mail發送序號提醒</p>
                            </div>
                        </div>
                    </div>
                    <div className="stepPhone" style={{backgroundImage:`url(${this.state.imgLink})`}}></div>
                </div>

                <div className="mibileSlider">
                    <div className="slider">
                        <ReactSlider {...settings}>
                            <div className="sliderBox">
                                <div className="img" style={{backgroundImage:`url(../../static/guide/a-special.gif)`}}></div>
                                <div className="title">跨影城搜尋</div>
                                <div className="content">快速比對各影城上映時刻尋找最適合你的場次、空位</div>
                            </div>
                            <div className="sliderBox">
                                <div className="img" style={{backgroundImage:`url(../../static/guide/b-special.gif)`}}></div>
                                <div className="title">選好位</div>
                                <div className="content">於座位圖直接點選想要的位置場次劃位狀況一目了然</div>
                            </div>
                            <div className="sliderBox">
                                <div className="img" style={{backgroundImage:`url(../../static/guide/c-special.gif)`}}></div>
                                <div className="title">線上訂票</div>
                                <div className="content">提供會員紅利優惠、信用卡優惠、原價票等方式購票</div>
                            </div>
                            <div className="sliderBox">
                                <div className="img" style={{backgroundImage:`url(../../static/guide/d-special.gif)`}}></div>
                                <div className="title">序號取票</div>
                                <div className="content">至影城現場憑序號取票同步以簡訊、E-mail發送序號提醒</div>
                            </div>
                        </ReactSlider>
                    </div>
                </div>

                <div className="stepButton">
                    <a href="/">立即體驗</a>
                    <img className="stepImg" src="/static/guide/dis-direct.svg"/>
                </div>
            </div>
		    </StepByStepWrapper>
	    )
    }
}

export default StepByStep;
