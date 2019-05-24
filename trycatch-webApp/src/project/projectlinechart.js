/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2019-05-13 11:27:07
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-24 14:28:30
 */
import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import NetClient from "../network/netclient";

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleLineChartData: [],
      pieChartData: [],
      allLineChartData: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allData !== this.props.allData) {
      this.setState({
        allLineChartData: this.props.allData
      });
    }

    if (this.props.debugers !== prevProps.debugers) {
      if (this.props.debugers.length > 0) {
        this._fetchData();
      }else {
        this.setState({
          multipleLineChartData: [],
          pieChartData: []
        })
      }
    }

    // console.log(
    //   "log prev " + JSON.stringify(prevProps) + " -- " + JSON.stringify(prevState)
    // );
    // console.log(
    //   "log didupdate this " + JSON.stringify(this.props) + " -- " + JSON.stringify(this.state)
    // );
  }

  _fetchData() {
    var slicePieData = [];
    var sliceData = [];
    this.props.debugers.map(debuger => {
      var propertyName = debuger.alias;
      NetClient.netPost(
        global.tt_constant.net_url_projectbugschart,
        {
          uid: debuger.user_id,
          project_id: this.props.projectId,
          debugger_ids: [debuger.user_id]
        },
        response => {
          if (response.msg.code === 0) {
            var per_count = 0;
            if (sliceData.length === 0) {
              sliceData = response.chart.map((yvalue, idx) => {
                per_count = per_count + yvalue;
                var obj = {};
                obj[propertyName] = yvalue;
                return obj;
              });
            } else {
              response.chart.map((yvalue, idx) => {
                per_count = per_count + yvalue;
                sliceData[idx][propertyName] = yvalue;
              });
            }

            slicePieData.push({ name: propertyName, value: per_count });

            this.setState({
              multipleLineChartData: sliceData,
              pieChartData: slicePieData
            });
          }
        }
      );
    });
  }

  componentDidMount() {
    console.log(
      "projectlinechart didmount " + JSON.stringify(this.props.debugers)
    );
    this._fetchData();
  }

  render() {
    console.log(
      "log this " +
        JSON.stringify(this.props) +
        " -- " +
        JSON.stringify(this.state)
    );
    // console.log(
    //   "projectlinechart render: " + JSON.stringify(this.state.multipleLineChartData)
    // );
    // console.log("projectpiechart: " + JSON.stringify(this.state.pieChartData));
    return (
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <LineChart
          data={this.state.allLineChartData}
          width={670}
          height={300}
          margin={{ left: -20, right: 20, top: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis />
          <Tooltip
            labelFormatter={name => {
              return "the " + (24 - name) + "th hour before";
            }}
            formatter={(value, name, props) => {
              return [value, "count"];
            }}
          />
          <Legend
            margin={{ top: 0 }}
            height={40}
            verticalAlign={"top"}
            payload={[
              {
                value: "Linechart of all members in 24HOUR",
                type: "line",
                id: "ID01"
              }
            ]}
          />
          <Line
            type="monotone"
            dataKey="yvalue"
            stroke="lightgray"
            strokeWidth={2}
            label={{
              dy: -15,
              fill: "gray",
              fontSize: 14,
              textAnchor: "middle"
            }}
          />
        </LineChart>
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
            display: "flex",
            height: 20,
            backgroundColor: "#F5F7F9"
          }}
        />
        <div
          style={{
            marginBottom: 50,
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <LineChart
            data={this.state.multipleLineChartData}
            width={670}
            height={300}
            margin={{ left: -20, right: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <XAxis />
            <Tooltip
              labelFormatter={name => {
                return "the " + (24 - name) + "th hour before";
              }}
            />
            <Legend verticalAlign={"top"} height={40} />
            {this.props.debugers.map((debuger, idx) => {
              return (
                <Line
                  key={debuger.user_id}
                  type="monotone"
                  dataKey={debuger.alias}
                  stroke={global.tt_constant.linechart_colors[idx]}
                  strokeWidth={2}
                  label={{
                    dy: -15,
                    fill: "gray",
                    fontSize: 14,
                    textAnchor: "middle"
                  }}
                />
              );
            })}
          </LineChart>
          <PieChart width={670} height={440}>
            <Legend verticalAlign={"top"} height={40} />
            <Pie
              data={this.state.pieChartData}
              cx={335}
              cy={150}
              labelLine={true}
              label={true}
              // label={renderCustomizedLabel}
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {this.state.pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    global.tt_constant.linechart_colors[
                      this.props.debugers.findIndex(
                        ele => ele.alias === entry.name
                      )
                    ]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    );
  }
}
