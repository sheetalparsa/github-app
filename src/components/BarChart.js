import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 0,
      total_pages: 0,
      monthly_data: [],
    };
  }

  componentDidMount = async () => {
    let url = `${this.props.url}/stats/participation`;
    let response = await axios.get(url);
    let commit_count = response.data.all;
    let data = [];

    for (let i = 0; i < commit_count.length; i++) {
      data.push({
        week: "week-" + (i + 1),
        commit: commit_count[i],
      });
    }

    this.setState({
      data: data,
      page: Math.ceil(data.length / 10),
      total_pages: Math.ceil(data.length / 10),
    });
  };

  getCurrentPageLastIndex() {
    const last_index = this.state.data.length - 1;
    let page_last_index =
      last_index - 10 * (this.state.total_pages - this.state.page);
    return page_last_index;
  }

  getCurrentPageFirstIndex() {
    const page_last_index = this.getCurrentPageLastIndex();
    if (page_last_index - 9 < 0) {
      return 0;
    }
    return page_last_index - 9;
  }

  onPageChange = (event, page) => {
    // calculate range based on page number
    this.setState({
      ...this.state,
      page: page
    });
  }

  render() {
    return (
      <Paper>
        <Chart
          data={this.state.data.slice(
            this.getCurrentPageFirstIndex(),
            this.getCurrentPageLastIndex() + 1
          )}
        >
          <ArgumentAxis />
          <ValueAxis
            max={
              this.getCurrentPageLastIndex() -
              this.getCurrentPageFirstIndex() +
              1
            }
          />

          <BarSeries valueField="commit" argumentField="week" barWidth={1} />
          <Title text="Participation Stats" />
          <Animation />
        </Chart>
        <Pagination
          count={6}
          defaultPage={6}
          onChange={(event, page) => this.onPageChange(event, page)}
          variant="outlined" color="secondary"
          shape="rounded"
          className="pagination"
        />
      </Paper>
    );
  }
}
