import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const infoAlert = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <img className="icon" />
      <div>{children}</div>
    </div>
  );
};

const styles = {
  root: {
    maxWidth: '330px',
    fontSize: '15px',
    padding: '20px 30px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#373737',
    borderRadius: '6px',

    '& img.icon': {
      content: 'url("../static/paymentWeb/Notice.png")',
      minWidth: '35px',
      minHeight: '35px',
      maxWidth: '35px',
      maxHeight: '35px',
      paddingRight: '16px',
    },
    '& p': { margin: '0px' },
  },
};

export default withStyles(styles)(infoAlert);
