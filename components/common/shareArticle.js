import React from 'react';
import { ShareArticleWrap } from '../../styled/commonStyled';

class ShareArticle extends React.Component{

    render(){

        let domain = location.protocol+ "//" + location.hostname +"/";
        return(
            <ShareArticleWrap>
                <div className="shareArticleDesktop" display={this.props.display}>
                    <a className="icon fbShare" href={`http://www.facebook.com/share.php?u=${domain}articlePage?content_id=${this.props.url}`} target="_blank"></a>
                    <a className="icon googleShare" href={`https://plus.google.com/share?url=${domain}articlePage?content_id=${this.props.url}`} target="_blank"></a>
                    <a className="icon lineShare" href={`https://lineit.line.me/share/ui?url=${domain}articlePage?content_id=${this.props.url}`} target="_blank"></a>
                </div>
                <div className="shareArticleMobile">
                    {this.props.isApp?
                        <a className="icon fbShare" href={ "https://www.facebook.com/dialog/share?app_id=2110939982489360&display=popup&href=" + encodeURIComponent(domain + "articlePage?device=app&content_id=" + this.props.url) + "&redirect_uri=" + encodeURIComponent(domain + "articlePage?device=app&content_id=" + this.props.url)}></a>
                        :
                        <a className="icon fbShare" href={`https://www.facebook.com/dialog/share?app_id=2110939982489360&display=popup&href=${domain}articlePage?content_id=${this.props.url}&redirect_uri=${domain}articlePage?content_id=${this.props.url}`}></a>
                    }
                    <a className="icon googleShare" href={`https://plus.google.com/share?url=${domain}articlePage?content_id=${this.props.url}`} target="_blank"></a>
                    <a className="icon lineShare" href={"line://msg/text/" + encodeURIComponent(domain + "articlePage?content_id=" + this.props.url)} target="_blank"></a>
                </div>
            </ShareArticleWrap>
        )
    }
}

export default ShareArticle;
