import React from 'react';
import 'isomorphic-unfetch';
import { GuideDiscountWrapper } from 'Styled/guideStyled';

const guideDiscount = () => (
  <GuideDiscountWrapper>
    <div className="guideDiscountWrap">
      <img className="discountTitle" src="/static/guide/discountTitle.png" />
      <div className="discountList">
        <div className="disBlock">
          <div className="disSec">
            <img className="disImg" src="/static/guide/bonus-1.svg" />
            <div className="disbox">
              <div className="distitle">
                <a>ez訂會員紅利</a>
              </div>
              <p className="disdescrip">
                消費一元累一點，滿500點
                <br />
                每張票
                <span className="focus">最高折100元</span>
              </p>
            </div>
            <div className="dismore">
              <a target="_blank" href="/bonusContents">
                了解詳情
              </a>
            </div>
          </div>
          <div className="addcircle a" />

          <div className="addcircle b" />
          <div className="disSec">
            <img className="disImg" src="/static/guide/bonus-3.svg" />
            <div className="disbox">
              <div className="distitle">
                <a>信用卡優惠</a>
              </div>
              <p className="disdescrip">
                訂票
                <span className="focus">66折起</span>
                <br />
                線上訂票享優惠
              </p>
            </div>
            <div className="dismore">
              <a href="/preferential" target="_blank">
                了解詳情
              </a>
            </div>
          </div>
          <div className="disSec">
            <img className="disImg" src="/static/guide/bonus-4.svg" />
            <div className="disbox">
              <div className="distitle">
                <a>亞洲萬里通</a>
              </div>
              <p className="disdescrip">
                <span className="focus">消費40元累1里</span>
                <br />
                訂票也可以累積哩程數
              </p>
            </div>
            <div className="dismore">
              <a href="https://event.ezding.com.tw/benefit/amevent2017/" target="_black">
                了解詳情
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="buttonToStep" />
    </div>
  </GuideDiscountWrapper>
);

export default guideDiscount;
