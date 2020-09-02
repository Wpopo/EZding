import HelperAxios from './helper/axios';
import HelperData from './helper/data';
import HelperPaymentData from './helper/paymentData';
import HelperRedirect from './helper/redirect';
import HelperDatetime from './helper/datetime';
import HelperApplePay from './helper/applePay';
import HelperAftee from './helper/aftee';

const Helper = {
  axios: HelperAxios,
  data: HelperData,
  payment: HelperPaymentData,
  redirect: HelperRedirect,
  datetime: HelperDatetime,
  applePay: HelperApplePay,
  aftee: HelperAftee,
};

export default Helper;
