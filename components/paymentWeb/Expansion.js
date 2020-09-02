import React from 'react';
import Immutable from 'immutable';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ButtonControlGroup from 'Components/paymentWeb/ButtonControlGroup';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

/**
 * @description 縮和Layout
 *
 * @prop {Map} item - 資料.
 * @prop {null || number} selectID - 目前被選中的expansion ID.
 * @prop {string} children - 放置於展開區的資料.
 * @prop {function} handeChange - 控制縮和事件.
 * @prop {object[]} classes - withStyles自訂classes.
 */

// item 固定格式
//  {
//   id: 1,
//   name: '全票',
//   price: 330,
//   summary: '',
//   desc: '全票的敘述',
// },

const Expansion = ({ item, selectID = null, children = null, handleChange, classes, ...props }) => {
  if (item.size === 0) return null;
  const itemData = item instanceof Immutable.Map ? item.toJS() : item;
  const { id, code, name, summary, price, point, quantity, image } = itemData;

  return (
    <ExpansionPanel
      className={classes.root}
      key={id + code}
      expanded={selectID === (code === undefined ? id : id + code)}
      onChange={handleChange}
    >
      <ExpansionPanelSummary
        expandIcon={<ButtonControlGroup price={price} point={point} quantity={quantity} {...props} />}
      >
        <div>
          <span className="name">{name}</span>
          <br />
          <span className="summary">{summary}</span>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="content">
        {image === null || image === undefined || image === '' ? null : <img src={image} />}
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const styles = theme => ({
  root: {
    '& .name': {
      fontSize: '18px',
      'word-break': 'break-all',
    },
    '& .summary': {
      fontSize: '12px',
      color: Palette.secondary['gray-60'],
      marginTop: '0px',
      'word-break': 'break-all',
    },
    '& .content': {
      display: 'flex',
      'flex-direction': 'column',
      'word-break': 'break-all',
      '& img': {
        maxWidth: '482px',
        maxHeight: '260px',
        width: '100%',
        height: 'auto',
        paddingBottom: '8px',
        margin: 'auto',
      },
      [theme.breakpoints.down('md')]: {
        '& img': {
          maxWidth: '668px',
          maxHeight: '360px',
        },
      },
      [theme.breakpoints.down('sm')]: {
        '& img': {
          maxWidth: '343px',
          maxHeight: '185px',
        },
      },
    },
  },
});

export default withStyles(styles)(Expansion);
