import React from 'react';
import Helper from 'Lib/helper';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const SideBar = ({ data = [], nView = '', setView, classes }) => {
  const showArr = Helper.payment.getShowSideBar();
  let isFirst = true;
  return (
    <div className={classes.root}>
      {data.map(item =>
        showArr[item.id] ? (
          <div
            key={item.id}
            className={`item ${nView === item.viewID ? 'focus' : ''}`}
            onClick={() => setView(item.viewID)}
          >
            <span>{item.title}</span>
            {/* 預設第一個Side Bar為顯示畫面 */}
            {nView === '' && isFirst ? setView(item.viewID) : null}
            {(isFirst = false)}
          </div>
        ) : null,
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    fontSize: '18px',
    textAlign: '-webkit-right',
    width: '100%',
    float: 'right',
    boxShadow: '4px 0 4px 0 rgba(0, 0, 0, 0.1)',
    marginTop: '-40px',
    paddingTop: '40px',

    '& .item': {
      width: '80px',
      height: '60px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      'justify-content': 'flex-end',
      cursor: 'pointer',
      '& span': { paddingRight: '10px' },
      '&.focus': {
        borderRadius: '100px 0px 0px 100px',
        backgroundColor: Palette.support['gray-2'],
        '& span': { color: Palette.support['pink-1'] },
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    root: {
      marginTop: '-20px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      paddingTop: '0px',
      float: 'unset',
      display: 'flex',
      'justify-content': 'space-around',
      boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)',
      height: '64px',
      '& .item': {
        'justify-content': 'center',
        '&.focus': {
          borderRadius: 'unset',
          backgroundColor: 'unset',
        },
      },
    },
  },
});

export default withStyles(styles)(SideBar);
