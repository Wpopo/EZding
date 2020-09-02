import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const statusRow = ({ data = [], classes }) => data === [] || data === undefined ? null : (
    <div className={classes.root}>
      {data.map((item, idx) => (
        <span className={classes.wrap} key={idx}>
          <span className="text">{item.text}</span>
          <span className="value">{item.value}</span>
        </span>
      ))}
    </div>
  );

const styles = {
  root: {
    paddingBottom: '15px',
    fontSize: '14px',
  },
  wrap: {
    paddingRight: '15px',
    '& .text': { paddingRight: '8px' },
    '& .value': { color: Palette.support['purple-2'] },
  },
};

export default withStyles(styles)(statusRow);
