/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2019-05-13 11:27:07 
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-14 12:37:57
 */
import React from 'react'
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import NetClient from "../network/netclient";

export default class Report extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      multipleLineChartData:[]
    }
  }

  componentDidMount() {
    console.log("projectlinechart "+JSON.stringify(this.props.debugers))
    this.props.debugers.map(debuger => {
      var propertyName = debuger.alias
      NetClient.netPost(global.tt_constant.net_url_projectbugschart, {
        uid: debuger.user_id,
        project_id: this.props.projectId,
        debugger_ids: [debuger.user_id]
      },
      response=>{
        if (response.msg.code === 0) {
          var sliceData = this.state.multipleLineChartData
          if (sliceData.length === 0) {
              sliceData = response.chart.map(
                (yvalue, idx) => {
                  var obj = {}
                  obj[propertyName] = yvalue
                  return obj
                }
              );
          }else {
            response.chart.map((yvalue, idx)=>{
              sliceData[idx][propertyName] = yvalue;
            })
          }

          this.setState({
            multipleLineChartData: sliceData
          })
        }
      });
    });
  }

  render() {
    // console.log("projectlinechart: "+ JSON.stringify(this.state.multipleLineChartData))
    return (
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <LineChart data={this.props.allData} width={670} height={300}>
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
            stroke="#3B67BC"
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
            height: 2,
            backgroundColor: "#3B67BC"
          }}
        />
        <div style={{ display: "flex", flex: 1 }}>
          <LineChart data={this.state.multipleLineChartData} width={670} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <XAxis />
            <Tooltip
              labelFormatter={name => {
                return "the " + (24 - name) + "th hour before";
              }}
              
            />
            <Legend
              verticalAlign={"top"}
            />
            {
              this.props.debugers.map((debuger, idx)=>{
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
              })
            }
            
          </LineChart>
        </div>
      </div>
    );
  }
}