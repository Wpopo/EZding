// 欄位值需要確認
const DATA = {
    amount: 30, // 付款⾦額:必填
    shop_transaction_no: 'shop-tran-no-015', // 店舖交易ID:必填
    user_no: 'shop-user-no-001', // 商家會員ID:選填
    sales_settled: true, // 交易確認
    transaction_options: [3], // 交易選項
    description_trans: '備註', // 店舖交易備註:選填
    checksum: 'Eba8b4JtD+inOc/zRON0D4RfODMfXwsz1hCdAmrq1CI=', // 驗證碼 : LdYtTSMBExdutzcS0aCSGA
    customer: { // :必填
      customer_name: '注⽂太郎',
      customer_family_name: '注⽂',
      customer_given_name: '太郎',
      phone_number: '090-1111-1111',
      birthday: '1990-01-01',
      sex_division: '1',
      company_name: 'Net Protections',
      department: '業務',
      zip_code: '110',
      address: '台北市信義區松智路1號11樓',
      email: 'no@netprotections.co.jp',
      total_purchase_count: 8,
      total_purchase_amount: 2160,
    },
    dest_customers: [{ // 商品提供者
      dest_customer_name: '銀座太郎',
      dest_company_name: 'Net Protections',
      dest_department: '系統部⾨',
      dest_zip_code: '110',
      dest_address: '台北市信義區松智路1號11樓',
      dest_tel: '0312341234',
      dest_email: '',
    }],
    items: [{ // 商品明細
        shop_item_id: 'item-012', // 店舖商品ID: 必填
        item_name: '商品012', // 商品名稱: 必填
        item_price: 1500, // 商品單價:必填
        item_count: 1, // 個數: 必填
        item_url: 'https://np-pay.be/items/012/', // 商品URL: 必填
    }],
};

const Helper = {
  getAfteeInit: (orderData) => {
    console.log('收到 orderData-->', orderData);
    Aftee.config({
      pre_token: '',
      pub_key: 'dla45Zw0p0vNMLJXbehDXw',
      payment: {},
      // 200:認證完成同時、亦或會員註冊完成同時呼叫
      authenticated(authentication_token, user_no) {
        console.log('CB--token-->', authentication_token, user_no);
      },
      // 付款popup畫⾯關閉同時呼叫
      cancelled() {
        console.log('CB--popup close-->');
      },
      // 審查結果NG後、按下關閉認證表格按鍵同時呼叫
      failed(response) {
        console.log('CB--NG-->', response);
      },
      // 審查結果OK後⾃動關閉認證表格同時呼叫
      succeeded(response) {
        console.log('CB--OK-->', response);
      },
      // 發⽣錯誤時呼叫
      error(name, message, errors) {
        console.log('CB--error-->', name, message, errors);
      },
      function() {
        console.log('AFTEE初始化成功');
        // Aftee.merge({
        //   payment: DATA,
        // });
        // Aftee.sync();
        // Aftee.start();
      },
    });
  },
  sendOrder: (checkFn, setLoading) => {
    // 檢查發票
    // if (!checkFn()) return;
    // --> ok
    // 整理 Data
    // --> ok
    // 拿 Data 去後端換 checksum
    // api 成功回來更新 data
    // 進行 Aftee.merge

    setTimeout(() => {
      setLoading(); // 關閉 loading
      console.log('--> popup 開啟');
      Aftee.merge({
        payment: DATA,
      });
      Aftee.sync();
      Aftee.start(); // 點擊時顯⽰popup畫⾯
    }, 10000);
  },
};

export default Helper;
