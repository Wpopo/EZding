import React, { Component } from 'react';
import { MemberLeft, SliderWrap } from '../../styled/memberLoginStyled';
import Slider from 'react-slick';

class MemberLoginLeft extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
    };
    return (
      <MemberLeft>
        <div className="wrapDescrib">
          <SliderWrap>
            <Slider {...settings}>
              <div>
                消費一元累一點 <br />
                滿500點每張票最高折100元
                <div>
                  <img src="../static/member/memberAD1.png" alt="" />
                </div>
              </div>
              <div>
                加入LINE@好友
                <br />
                送100元好友禮
                <div>
                  <img src="../static/member/memberAD2.png" alt="" />
                </div>
              </div>
              <div>
                透過專屬連結
                <br />
                邀好友加入和好友一起拿66折券
                <div>
                  <img src="../static/member/memberAD3.png" alt="" />
                </div>
              </div>
            </Slider>
          </SliderWrap>
        </div>
      </MemberLeft>
    );
  }
}

export default MemberLoginLeft;
