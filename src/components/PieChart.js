import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_data: [],
    };
  }

  componentDidMount = async () => {
    let commit_activity_url = `${this.props.url}/stats/commit_activity`;
    let commit_activity_response = await axios.get(commit_activity_url);
    let commit_activity_data = commit_activity_response.data;
    console.log(commit_activity_data);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let monthly_data = [];
    if(commit_activity_data.length > 0) {
      for (let i = 0; i < 12; i++) {
        let commit_sum = 0;
        for (let j = 0; j < 4; j++) {
          commit_sum = commit_sum + commit_activity_data[4 * i + j].total;
        }

        let temp = {
          month: months[i],
          commit: commit_sum,
        };
        monthly_data.push(temp);
      }
    }  
    this.setState({
      monthly_data: monthly_data,
    });
    
  };

  render() {
    return (
      <Paper>
        <Chart data={this.state.monthly_data}>
          <PieSeries valueField="commit" argumentField="month" />
          <Title text="Yearly Activity" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
