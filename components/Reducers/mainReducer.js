import Immutable from 'immutable';
import {
  mainReset,
  setPopcornFlag,
  setPopcornText,
  setView,
  setPreferentialView,
  setPreferentialTicketView,
  setInitOrderInfo,
  setMovieInfo,
  setErpCode,
} from 'Actions/mainActions';
import { handleActions } from 'redux-actions';

// 預設第一頁顯示畫面為會員條款
const initState = Immutable.fromJS({
  view: 'servicePolicy',
  preferentialView: '',
  preferentialTicketView: 'default',
  /*
  訂購資訊
  {
    cinema_id: cinemaId,
    movie_id: movieId,
    seat_idx_list: obj.seatIdxList,
    sessionId: session_id,
    ticketQuantity: people,
    campaign_code: campaignCodeText,
    seatsInfo: obj.seatInfo,
    options: thirdParty,
    cinemaTransId,
    transaction_id,
    hall_id,
    area_num,
    area_category_code,
    cinema_trans_id,
  }
  */
  orderInfo: {},
  movieInfo: {},
  erpCode: '',
  // 爆米花控制項
  popcornFlag: false, // 顯示爆米花
  popcornText: '', // 爆米花警告文字
});
const mainReducer = handleActions(
  {
    // Reset
    [mainReset]: () => initState,

    // 設定爆米花開關
    [setPopcornFlag]: (state, { payload }) => state.set('popcornFlag', payload),

    // 設定爆米花文字
    [setPopcornText]: (state, { payload }) => state.set('popcornText', payload),

    // 設定目前該顯示頁面
    [setView]: (state, { payload }) => state.set('view', payload),

    // 設定[選優惠]目前該顯示頁面
    [setPreferentialView]: (state, { payload }) => state.set('preferentialView', payload),

    // 設定[選優惠-細項]目前該顯示頁面
    [setPreferentialTicketView]: (state, { payload }) => state.set('preferentialTicketView', payload),

    // 設定初始訂票資訊
    [setInitOrderInfo]: (state, { payload }) => state.set('orderInfo', payload),

    // 新增訂購資訊
    [setMovieInfo]: (state, { payload }) => state.set('movieInfo', payload),

    // 設定erpCode
    [setErpCode]: (state, { payload }) => state.set('erpCode', payload),
  },
  initState,
);

export default mainReducer;
