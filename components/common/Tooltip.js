import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';

const tip = ({ cusClass, text = '', classes }) => {
  return (
    <Tooltip className={`${cusClass} ${classes.root}`} title={text} placement="bottom-start">
      <Info />
    </Tooltip>
  );
};

const styles = {
  root: {
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    paddingLeft: '5px',
  },
};

export default withStyles(styles)(tip);
