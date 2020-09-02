import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { GuideSocialWrapper } from '../../styled/guideStyled';

class GuideSocial extends React.Component {



  	render () {

	    return (
		    <GuideSocialWrapper>
                <div className="guideSocialWrap">
                    <div className="socialTitle">
                        <img className="socialMailTitle" src="/static/guide/socialTitleBg.svg"/>
                        <a>電影交流社群</a>
                    </div>
                    <div className="socialcontent">
                        <div className="socialSec">
                            <img src="/static/guide/s-fb.svg"/>
                            <a>ez訂粉絲團</a>
                            <p>必加入！獨家好康前線快找小編聊電影、拿好康</p>
                            <div className="iframeFbBox">
                                <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fsofunezding&width=130&layout=button_count&action=like&size=large&show_faces=false&share=true&height=46&appId" width="130" height="46" scrolling="no" frameBorder="0" allowtransparency="true" style={{border:"none",overflow:"hidden"}} ></iframe>
                            </div>
                        </div>
                        <div className="socialSec">
                            <img src="/static/guide/s-comment.svg"/>
                            <a>評分討論</a>
                            <p>ez訂會員們最真實的觀後評分，還在猶豫要不要看這部？快來看看！</p>
                        </div>
                        <div className="socialSec">
                            <img src="/static/guide/s-article.svg"/>
                            <a>影評文章</a>
                            <p>電影重大新聞、有趣專題、專業影評電影資訊補血囉！</p>
                        </div>
                        <div className="socialSec">
                            <img src="/static/guide/s-look.svg"/>
                            <a>預告片觀看</a>
                            <p>不知道看什麼電影？從預告片、電影大綱找尋你的片單</p>
                        </div>
                    </div>
                </div>
		    </GuideSocialWrapper>
	    )
  }
}

export default GuideSocial;
