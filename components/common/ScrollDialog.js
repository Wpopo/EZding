import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// scroll=paper the content of the dialog scrolls within the paper element.
// scroll=body the content of the dialog scrolls within the body element.
const ScrollDialog = ({ open = false, scroll = 'paper', handleClose, children, classes }) => (
  <Dialog
    className={classes.root}
    open={open}
    onClose={handleClose}
    scroll={scroll}
    aria-labelledby="scroll-dialog-title"
  >
    <DialogContent dividers={scroll === 'paper'}>{children}</DialogContent>
    <DialogActions>
      <Button className="common-btn" variant="contained" onClick={handleClose}>
        確認
      </Button>
    </DialogActions>
  </Dialog>
);

const styles = {
  root: {
    '& .MuiButton-label': { fontSize: '18px' },
  },
};

export default withStyles(styles)(ScrollDialog);
