import {
  mobileNumber,
  myPassword,
  showError,
  showDisplay,
  validateAction,
  updateCheck_1,
  updateCheck_2,
  updateCheck_3,
  updateCheck_4,
} from 'Actions/memberActions';
import { handleActions } from 'redux-actions';

//預設會員初始狀態
const initialState = {
  member: {
    mobileNumber: '',
    myPassword: '',
    newPassword: '',
    validation: {
      check_1: '',
      check_2: '',
      check_3: '',
      check_4: '',
    },
    action: 0,
    showError: false,
    display: 'isLogin',
  },
};

const MemberReducer = handleActions(
  {
    //mobileNumber
    [mobileNumber]: (state, { payload }) => {
      return {
        ...state,
        member: { ...state.member, mobileNumber: payload },
      };
    },
    //myPassword
    [myPassword]: (state, { payload }) => {
      return {
        ...state,
        member: { ...state.member, myPassword: payload },
      };
    },
    //顯示錯誤訊息
    [showError]: (state, { payload }) => {
      return {
        ...state,
        member: { ...state.member, showError: payload },
      };
    },
    //顯示哪一頁
    [showDisplay]: (state, { payload }) => {
      return {
        ...state,
        member: { ...state.member, display: payload },
      };
    },
    //驗證action
    [validateAction]: (state, { payload }) => {
      return {
        ...state,
        member: { ...state.member, action: payload },
      };
    },
    //驗證碼_1
    [updateCheck_1]: (state, { payload }) => {
      return {
        ...state,
        member: {
          ...state.member,
          validation: {
            ...state.member.validation,
            check_1: payload,
          },
        },
      };
    },
    //驗證碼_2
    [updateCheck_2]: (state, { payload }) => {
      return {
        ...state,
        member: {
          ...state.member,
          validation: {
            ...state.member.validation,
            check_2: payload,
          },
        },
      };
    },
    //驗證碼_3
    [updateCheck_3]: (state, { payload }) => {
      return {
        ...state,
        member: {
          ...state.member,
          validation: {
            ...state.member.validation,
            check_3: payload,
          },
        },
      };
    },
    //驗證碼_4
    [updateCheck_4]: (state, { payload }) => {
      return {
        ...state,
        member: {
          ...state.member,
          validation: {
            ...state.member.validation,
            check_4: payload,
          },
        },
      };
    },
  },
  initialState,
);

export default MemberReducer;
