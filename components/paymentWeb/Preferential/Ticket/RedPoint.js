import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import LocalParking from '@material-ui/icons/LocalParking';
import ButtonControlGroup from 'Components/paymentWeb/ButtonControlGroup';
import InfoAlert from 'Components/common/infoAlert';
import { setMemberRedPoint, addRedPoint, reduceRedPoint } from 'Actions/preferentialActions';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

class RedPoint extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setMemberRedPoint, point, setAlert } = this.props;

    // 取得會員紅利
    Helper.axios.fetch(
      API.MEMBER.GET_RED_POINT(),
      cb => {
        setMemberRedPoint(cb.point_sum, point.point);
      },
      {
        errorFn: () => setMemberRedPoint(0),
        cusCode: { 300: msg => setAlert(msg) },
      },
    );
  }

  // 控制張數 +1
  handleAdd = (quantity, maxQty) => {
    const { addPoint } = this.props;

    if (quantity < maxQty) {
      addPoint();
    }
  };

  render() {
    const { classes, point, reducePoint } = this.props;

    if (Object.keys(point).length <= 0) return null;
    const { name, price = 0, quantity = 0, memberPoint = 0, maxQty = 0 } = point;
    return (
      <div>
        <div className={classes.titleWrap}>
          你的紅利點數
          <LocalParking className="redPoint" />
          <span>{`${memberPoint} 點`}</span>
        </div>
        {memberPoint > point.point ? (
          <div className={classes.subTitleWrap}>
            可折抵
            <span className="num">{maxQty}</span>張
          </div>
        ) : null}
        <div className={classes.contentWrap}>
          {(() => {
            switch (memberPoint < point.point) {
              // 點數不足
              case true:
                return '沒有足夠的紅利點數，請選擇其他優惠';

              // 點數足夠
              case false:
                return (
                  <div className="boxWrap">
                    <span>{name}</span>
                    <ButtonControlGroup
                      price={price}
                      quantity={quantity}
                      add={() => this.handleAdd(quantity, maxQty)}
                      reduce={() => reducePoint()}
                    />
                  </div>
                );
              default:
                return null;
            }
          })()}
        </div>
        <div className={classes.warning}>
          <InfoAlert
            children={
              <div>
                <p>消費1元累1點！</p>
                <p>凡累積滿500點，即可用會員紅利優惠價訂購1張電影票！</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}
const styles = {
  titleWrap: {
    fontSize: '14px',
    color: Palette.primary['white-1'],
    border: `1px solid ${Palette.secondary['gray-60']}`,
    display: 'inline-block',
    padding: '3px 10px',
    marginRight: '12px',

    '& .redPoint': {
      width: '10px',
      height: '10px',
      color: '#e50081',
      backgroundColor: Palette.primary['white-1'],
      margin: '0 5px',
      padding: '1px',
      borderRadius: '50%',
      '-moz-border-radius': '50%',
      '-webkit-border-radius': '50%',
    },
  },
  subTitleWrap: {
    display: 'inline-block',
    color: Palette.primary['white-1'],
    '& .num': { color: Palette.support['pink-1'], margin: '0 3px' },
  },
  contentWrap: {
    paddingTop: '16px',
    fontSize: '16px',
    color: Palette.secondary['gray-60'],

    '& .boxWrap': {
      padding: '16px 0px',
      display: 'flex',
      'justify-content': 'space-between',
      borderBottom: `1px solid ${Palette.support['gray-2']}`,
    },

    '& span': { fontSize: '18px' },
  },
  warning: {
    paddingTop: '16px',
  },
};

export default withStyles(styles)(
  connect(
    state => ({
      point: state.getIn(['preferential', 'redPoint']),
    }),
    dispatch => ({
      setMemberRedPoint(point, basePoint) {
        dispatch(setMemberRedPoint({ point, basePoint }));
      },
      addPoint() {
        dispatch(addRedPoint());
      },
      reducePoint() {
        dispatch(reduceRedPoint());
      },
    }),
  )(RedPoint),
);
