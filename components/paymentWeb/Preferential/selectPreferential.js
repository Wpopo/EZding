import React from 'react';
import { connect } from 'react-redux';
import SideBar from 'Components/common/SideBar';
import Ticket from '../Preferential/Ticket/Index';
import { setPreferentialView } from 'Actions/mainActions';
import { withStyles } from '@material-ui/core/styles';

const selectPreferential = ({ ...props }) => {
  const { view, setView, classes } = props;
  const viewList = [
    { id: 1, title: '電影票', viewID: 'ticket' },
    { id: 2, title: '套票', viewID: 'package' },
    { id: 3, title: '加購餐', viewID: 'food' },
  ];

  return (
    <div className="twoWrap">
      {/* 左方選擇區頁面 */}
      <div className="leftWrap">
        <SideBar data={viewList} nView={view} setView={setView} />
      </div>

      {/* 右方頁面 */}
      <div className="rightWrap">
        {(() => {
          switch (view) {
            // 電影票
            case 'ticket':
              return <Ticket />;

            // 套票
            case 'package':
              return (
                <div className={classes.noData}>
                  <img className="icon" />
                  <span className="text">套票優惠洽談中</span>
                </div>
              );

            // 加購餐
            case 'food':
              return (
                <div className={classes.noData}>
                  <img className="icon" />
                  <span className="text">加購餐優惠洽談中</span>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

const styles = {
  noData: {
    textAlign: 'center',
    marginTop: '80px',
    fontSize: '16px',
    margin: 'auto',
    '& .icon': {
      width: '93px',
      height: '103px',
      content: 'url("../static/paymentWeb/preferentialNoData.png")',
    },
    '& .text': {
      padding: '25px 0 0 10px',
      display: 'block',
    },
  },
};
export default withStyles(styles)(
  connect(
    state => ({
      view: state.getIn(['main', 'preferentialView']),
    }),
    dispatch => ({
      setView(view) {
        dispatch(setPreferentialView(view));
      },
    }),
  )(selectPreferential),
);
