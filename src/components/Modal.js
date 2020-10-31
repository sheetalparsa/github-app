import React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";

import "../style/modal.css";

const styles = (theme) => ({
  root: {
    backgroundColor: "red",
  },
});

class Modal extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal">
        <IconButton className="toggle-button" onClick={this.onClose} startIcon={CloseIcon}>
          <CloseIcon />
        </IconButton>
        <p id="name">{this.props.repo}</p>
        <div >
          <BarChart url={this.props.url} />
          <PieChart url={this.props.url} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Modal);
