import axios from 'axios';
import store from 'Store';

let EVN = {};

// New Payment Web 相關API
const newPaymentWebRequest = (param = {}) => {
  const baseURL = param.baseURL === undefined ? 'newPaymentWeb/new_ezding' : param.baseURL;
  const header = param.headers === undefined ? '' : param.headers;

  return axios.create({
    baseURL,
    headers: header,
    // timeout: 10000, // 10s
  });
};

EVN = (item = '') => {
  const state = store.getState();

  switch (item) {
    case 'token':
      return localStorage.getItem('accessToken');
    case 'ecmID':
      return state.getIn(['main', 'movieInfo', 'ecm_id']) === undefined
        ? '0'
        : state.getIn(['main', 'movieInfo', 'ecm_id']);
    case 'ecdID':
      return state.getIn(['main', 'movieInfo', 'ecd_id']) === undefined
        ? '0'
        : state.getIn(['main', 'movieInfo', 'ecd_id']);
    case 'erpCode':
      return state.getIn(['main', 'erpCode']) === '' ? '' : state.getIn(['main', 'erpCode']);
    case 'movieID':
      return state.getIn(['main', 'movieInfo', 'movie_id']) === undefined
        ? ''
        : state.getIn(['main', 'movieInfo', 'movie_id']);
    case 'version':
      return state.getIn(['main', 'movieInfo', 'movie_version']) === undefined
        ? ''
        : state.getIn(['main', 'movieInfo', 'movie_version']);
    case 'channelCode':
      return state.getIn(['main', 'orderInfo', 'channelCode']) === undefined
        ? ''
        : state.getIn(['main', 'orderInfo', 'channelCode']);
    default:
      return '';
  }
};

const AxiosAPI = {
  CINEMAS: {
    // 取得影城系列資訊
    GET_INFO: (ecmID = EVN('ecmID')) => newPaymentWebRequest().get(`/cinemas/series?ecm_id=${ecmID}`),
  },
  PRODUCT: {
    // 取得票價項目資訊-商品
    GET_PRODUCT: (erpCode = EVN('erpCode'), productType = '1,2,3', fareType = '6,7,8', ecdID = EVN('ecdID')) =>
      newPaymentWebRequest().get(
        `/ez_product/fares?erp_product_code=${erpCode}&product_type=${productType}&fare_type=${fareType}&ecd_id=${ecdID}`,
      ),

    // 取得票價項目資訊-電影票優惠
    GET_TICKET_PREFERENTIAL: (
      erpCode = EVN('erpCode'),
      productType = '1',
      fareType = '1,2,3,4,5,10,11',
      ecdID = EVN('ecdID'),
    ) =>
      newPaymentWebRequest().get(
        `/ez_product/fares?erp_product_code=${erpCode}&product_type=${productType}&fare_type=${fareType}&ecd_id=${ecdID}`,
      ),

    // 檢核銀行滿額優惠
    CHECK_BANK_PREFERENTIAL: (num = 0, epfmID = 0) =>
      newPaymentWebRequest().get(`/ez_discount/fulldiscount?check_number=${num}&epfm_id=${epfmID}`),

    // 取得單筆coupon資訊
    GET_ONE_COUPON: (
      couponNo = '',
      ecdID = EVN('ecdID'),
      movieID = EVN('movieID'),
      version = EVN('version'),
      channelCode = EVN('channelCode'),
    ) =>
      newPaymentWebRequest().get(
        `/ez_product/order_coupon_info?coupon_no=${couponNo}&ecd_id=${ecdID}&movie_id=${movieID}&version=${version}&channel_code=${channelCode}`,
      ),

    // 取得會員歸戶coupon清單
    GET_PERSONAL_COUPON: (token = EVN('token')) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/order_coupon_list', {
        ecd_id: EVN('ecdID'),
        movie_id: EVN('movieID'),
        version: EVN('version'),
        channel_code: EVN('channelCode'),
      }),

    // 登入HayypGo會員帳號
    LOGIN_HAPPY_GO: (phone = 0, id = 0) =>
      newPaymentWebRequest().get(`/ez_thirdparty/login_happygo?mobile_num=${phone}&id_num=${id}`),

    // 綁定HappyGo會員帳號
    BIND_HAPPY_GO: (phone = 0, id = 0, accID = 0, OTP = 0) =>
      newPaymentWebRequest().post('/ez_thirdparty/bind_happygo', {
        mobile_num: phone,
        id_num: id,
        case_id: accID,
        otpcode: OTP,
      }),
  },
  ORDERS: {
    // 與影城交易(用戶選擇座位資料)
    LOCK_SEATS: (data, token) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/orders/booking_selected_seats', JSON.stringify(data)),

    // 新增訂購資訊
    NEW_ORDER: (data, token) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/new_order_info', JSON.stringify(data)),

    // 取得付款工具資訊
    GET_PAYMENT_TOOL: (emfmID = 0) => newPaymentWebRequest().get(`/ez_product/payment_method?epfm_id=${emfmID}`),

    // 成立訂單：信用卡, Apple Pay
    CREATE_CREDIT_ORDER: (data, token = EVN('token')) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/complete_order_info', JSON.stringify(data)),

    // 成立訂單：LINE PAY, 遠傳
    CREATE_EXTERNAL_ORDER: (data, token = EVN('token')) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/apply_external_order_info', JSON.stringify(data)),

    // 成立訂單：APPLE PAY
    CREATE_APPLEPAY_ORDER: (ez_trans_master_id, token = EVN('token')) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/pay_verification', {
        data: [
          {
            key: 'validationURL',
            value: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession',
          },
        ],
        ez_trans_master_id,
        use_type: 'applepay',
      }),

    // 完成訂單：外部
    COMPLETE_EXTERNAL_ORDER: (data, token = EVN('token')) =>
      newPaymentWebRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/complete_external_order_info', JSON.stringify(data)),
  },
  MEMBER: {
    // 取得會員有效紅利總點數
    GET_RED_POINT: (token = EVN('token'), type = 'ez_member_point') =>
      newPaymentWebRequest({
        headers: { 'x-ftc-authorization': token },
      }).get(`/api/members/points?point_type=${type}`),
    GET_INFO: (token = EVN('token')) =>
      newPaymentWebRequest({
        baseURL: '',
        headers: { 'x-ftc-authorization': token },
      }).get('/MemberUI/api/members/detail'),
  },
};

export default AxiosAPI;
