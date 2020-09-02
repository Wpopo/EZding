import React, { Component } from 'react';
import store from 'Store';
import { Provider } from 'react-redux';
import HeadMeta from '../components/headMeta';
import MemberLoginContent from '../components/memberLogin/memberLoginContent';

export class Member extends Component {
  render() {
    return (
      <Provider store={store}>
        <HeadMeta />
        <MemberLoginContent />
      </Provider>
    );
  }
}
export default Member;
