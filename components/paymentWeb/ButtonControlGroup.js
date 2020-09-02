import React from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { setPopcornFlag } from 'Actions/mainActions';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const ButtonControlGroup = ({
  price = 0,
  point = 0,
  quantity = 0,
  first_unit = '元',
  second_unit = '點',
  add,
  reduce,
  classes,
  ...props
}) => (
  <div className={classes.root}>
    <span className={classes.priceWrap}>
      {/* 若有傳入point則顯示 */}
      {point > 0 && point !== undefined && point !== null ? (
        <React.Fragment>
          <span className="price">{point}</span>
          <span className="unit">{second_unit}</span>
          <span className="and">+</span>
        </React.Fragment>
      ) : null}

      {/* price */}
      <span className="price">{price}</span>
      <span className="unit">{first_unit}</span>
    </span>

    <div className={classes.btnWrap}>
      {quantity <= 0 ? null : (
        <React.Fragment>
          <RemoveIcon
            onClick={e => {
              // 因防止冒泡(stopPropagation)，
              // 會造成popcorn flag不正常關閉
              // 所以需特別再加入popcornClose()
              // 控制 popcorn flag主動關閉
              props.popcornClose();
              reduce();
              e.stopPropagation();
            }}
          />
          <span className="quantity">{quantity}</span>
        </React.Fragment>
      )}

      <AddIcon
        onClick={e => {
          // 因防止冒泡(stopPropagation)，
          // 會造成popcorn flag不正常關閉
          // 所以需特別再加入popcornClose()
          // 控制 popcorn flag主動關閉
          props.popcornClose();
          add();
          e.stopPropagation();
        }}
      />
    </div>
  </div>
);

const styles = {
  root: {
    fontSize: '18px',
    color: Palette.primary['white-1'],
    display: 'flex',
    justifyContent: 'space-between',
  },

  priceWrap: {
    paddingRight: '15px',
    '& .price': { fontSize: '16px' },
    '& .unit': { fontSize: '14px' },
    '& .and': { fontSize: '14px', padding: '0 3px' },
  },

  btnWrap: {
    display: 'flex',

    '& .quantity': { color: Palette.support['pink-1'] },
    '& span': { padding: '0 2px' },
    '& svg': { fontSize: '22px', height: '100%', cursor: 'pointer' },
  },
};
export default connect(
  state => ({}),
  dispatch => ({
    popcornClose() {
      dispatch(setPopcornFlag(false));
    },
  }),
)(withStyles(styles)(ButtonControlGroup));
