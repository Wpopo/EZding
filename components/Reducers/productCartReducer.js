import Immutable from 'immutable';
import CONSTANT from 'CONSTANTS';
import {
  productReset,
  setProductPopcornFlag,
  setProductPopcornText,
  addTicket,
  reduceTicket,
  setInitTicketList,
  setInitUseFare,
  addFareProduct,
  reduceFareProduct,
  setBookingTicket,
} from 'Actions/productCartActions';
import { handleActions } from 'redux-actions';

// 預設電影票初始狀態
const initState = Immutable.fromJS({
  money: 0, // 目前總金額
  bookingTicket: 0, // 應選座位數量
  selectedTicket: 0, // 已選座位數量
  fareTicket: 0, // 可搭優惠數量
  ticketList: [], // 所有電影票、套票商品
  // 爆米花控制項
  popcornFlag: false, // 顯示爆米花
  popcornText: '', // 爆米花警告文字

  // 優惠號碼, 若商品id存在於此陣列, 代表此商品為可搭優惠商品
  // {
  //    title: item.product_name,
  //    id: item.product_type,
  //    fareNum: item.use_fare,
  //    fareQty: 0, 可選優惠數量
  //    selectedQty: 0 已選優惠數量
  // }
  useFare: {
    1: { fareQty: 0, fareNum: null },
    2: { fareQty: 0, fareNum: null },
    3: { fareQty: 0, fareNum: null },
  },
});
const ProductCartReducer = handleActions(
  {
    // Reset
    [productReset]: () => initState,

    // 設定爆米花開關
    [setProductPopcornFlag]: (state, { payload }) => state.set('popcornFlag', payload),

    // 設定爆米花文字
    [setProductPopcornText]: (state, { payload }) => state.set('popcornText', payload),

    // 設定初始電影商品清單
    [setInitTicketList]: (state, { payload }) => state.set('ticketList', payload),

    // 電影商品數量 +1
    [addTicket]: (state, { payload }) => {
      // 該項票種目前數量
      const nQty = state.getIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'quantity']);
      // 該項票種ID
      const productID = state.getIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'id']);
      // 種類ID, 1:電影票, 2:套票
      const typeID = state.getIn(['ticketList', payload.groupIdx, 'id']);
      // 已選座位數量
      const selectedTicket = state.get('selectedTicket');
      // 應選座位數量
      const bookingTicket = state.get('bookingTicket');
      // 目前可搭優惠數量
      let fareQty = state.getIn(['useFare', typeID, 'fareQty']);

      // 票種ID符合useFare則可搭優惠票數 +1   16(全票)才能選優惠
      if (state.getIn(['useFare', typeID, 'fareNum']).includes(productID) && productID === 16) {
        fareQty += 1;
      }

      if (selectedTicket + 1 <= bookingTicket) {
        return state
          .setIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'quantity'], nQty + 1)
          .set('selectedTicket', selectedTicket + 1)
          .setIn(['useFare', typeID, 'fareQty'], fareQty)
          .set('popcornFlag', true)
          .set('popcornText', CONSTANT.popcorn.product.add);
      }
      return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.product.noMatch);
    },

    // 電影商品數量 -1
    [reduceTicket]: (state, { payload }) => {
      // 該項票種目前數量
      const nQty = state.getIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'quantity']);
      // 該項票種ID
      const productID = state.getIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'id']);
      // 種類ID, 1:電影票, 2:套票
      const typeID = state.getIn(['ticketList', payload.groupIdx, 'id']);
      // 已選座位數量
      const selectedTicket = state.get('selectedTicket');
      // 目前可搭優惠數量
      let fareQty = state.getIn(['useFare', typeID, 'fareQty']);

      // 票種ID符合useFare則可搭優惠票數 +1
      if (state.getIn(['useFare', typeID, 'fareNum']).includes(productID)) {
        fareQty -= 1;
      }

      return state
        .setIn(['ticketList', payload.groupIdx, 'list', payload.ticketIdx, 'quantity'], nQty - 1)
        .set('selectedTicket', selectedTicket - 1)
        .setIn(['useFare', typeID, 'fareQty'], fareQty)
        .set('popcornFlag', false);
    },

    // 設定初始優惠號碼
    [setInitUseFare]: (state, { payload }) => state.set('useFare', payload),

    // 可搭優惠數量 +1
    [addFareProduct]: (state, { payload }) => {
      // 票種ID符合useFare則可搭優惠票數 +1
      if (state.getIn(['useFare', payload.id, 'fareNum']).includes(payload.num)) {
        return state.setIn(['useFare', payload.id, 'fareQty'], state.getIn(['useFare', payload.id, 'fareQty']) + 1);
      }
      return state;
    },

    // 可搭優惠數量 -1
    [reduceFareProduct]: (state, { payload }) => {
      // 票種ID符合useFare則可搭優惠票數 -1
      if (state.getIn(['useFare', payload.id, 'fareNum']).includes(payload.num)) {
        return state.setIn(['useFare', payload.id, 'fareQty'], state.getIn(['useFare', payload.id, 'fareQty']) - 1);
      }
      return state;
    },

    // 應選座位數量
    [setBookingTicket]: (state, { payload }) => state.set('bookingTicket', payload),
  },
  initState,
);

export default ProductCartReducer;
