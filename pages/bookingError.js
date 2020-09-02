import React from 'react';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import { RepairWrapper } from '../styled/commonStyled';

export default (props) => (
  <div>
    <HeadMeta />
    <Navbar url={props.url} />
    <RepairWrapper>
      <img className="errorBookingImg" src={'/static/common/errorBooking.png'} alt="" />
      <div className="errorBookingTitle">親愛的用戶您好，提醒您</div>
      <div className="errorBookingText">
        <div className="errorBookingSubText">本次交易未完成，可能原因如下：</div>
        <ol>
            <li>您使用的卡片紅利點數不足</li>
            <li>信用卡資訊輸入錯誤</li>
            <li>銀行系統忙碌或連線逾時</li>
            <li>其他信用卡交易限制(刷卡額度、單筆授權上限、效期等)</li>
        </ol>
      </div>
    </RepairWrapper>
    <CinemaEntry />
    <Footer />
  </div>
);
