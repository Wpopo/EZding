import React from 'react';
import { GiftAdsWrapper, GiftAdsMobileWrapper } from 'Styled/commonStyled';

class GiftAds extends React.Component {
  constructor(props) {
    super(props);

    this.isShow = this.isShow.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showAlways = this.showAlways.bind(this);

    this.state = {
      isAdsShow: false,
      isCrossShow: true,
      adsPadLink: 'https://maac.io/XZsi',
      adsMobileLink: 'https://maac.io/XZsk',
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', () => this.setState({ isAdsShow: false }), false);
  }

  isShow() {
    this.setState({
      isCrossShow: false,
    });
    sessionStorage.setItem('giftAds', false);
  }

  showAlways() {
    this.setState({
      isAdsShow: true,
    });
  }

  showInfo() {
    const { isAdsShow } = this.state;
    this.setState({
      isAdsShow: !isAdsShow,
    });
  }

  render() {
    const { isAdsShow, isCrossShow, adsPadLink, adsMobileLink } = this.state;
    return (
      <div>
        <GiftAdsWrapper isAdsShow={isAdsShow} isCrossShow={isCrossShow}>
          <div className="giftAdsWrapper">
            <div className="imgBox">
                <div className="crossIcon" />
              <img className="img" onClick={this.showAlways} src="/static/common/giftAdsSample.png" />
            </div>
            <div className="giftBox">
              {!isAdsShow && <div className="crossIcon" onClick={this.isShow} />}
              <img className="giftIcon" onClick={this.showInfo} src="/static/common/giftIcon.png" />
            </div>
          </div>
        </GiftAdsWrapper>
        <GiftAdsMobileWrapper>
          <a href={adsPadLink}>
            <img className="giftAdsPad" src="/static/common/giftAdsPad.png" />
          </a>
          <a href={adsMobileLink}>
            <img className="giftAdsMobile" src="/static/common/giftAdsMobile.png" />
          </a>
        </GiftAdsMobileWrapper>
      </div>
    );
  }
}

export default GiftAds;
