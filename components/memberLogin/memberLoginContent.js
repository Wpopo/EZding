import React, { useState, useEffect } from 'react';
import { MemberLayout, MemberContent } from '../../styled/memberLoginStyled';
import { connect } from 'react-redux';
import { showDisplay } from '../../components/Actions/memberActions';
import MemberLoginLeft from '../../components/memberLogin/memberLoginLeft';
import MemberLoginRight from '../../components/memberLogin/memberLoginRight';
import PolicyRule from '../../components/memberLogin/PolicyRule';

function MemberLoginContent({ ...props }) {
  const display = props.display;
  const { showDisplay } = props;

  const [show, setShow] = useState(false);
  const handleClickOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("params",  params.get('redirect_uri'))
    if (params.get('redirect_uri') !== null) {
      localStorage.setItem('redirect_uri', params.get('redirect_uri'));
    }

    //新增瀏覽器history
    history.pushState({ page: display }, '/member', `?page=${display}`);
    window.addEventListener(
      'popstate',
      function (e) {
        e.state.page !== undefined ? showDisplay(e.state.page) : (window.location.href = '/');
      },
      true,
    );
  }, [display]);
  return (
    <MemberLayout>
      <MemberContent>
        <MemberLoginLeft />
        <MemberLoginRight handleClickOpen={handleClickOpen} />
        <PolicyRule handleClose={handleClose} show={show} />
      </MemberContent>
    </MemberLayout>
  );
}
const mapStateToProps = (state) => {
  return {
    display: state.getIn(['member']).member.display,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showDisplay: (value) => {
      dispatch(showDisplay(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberLoginContent);
