/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2019-05-27 16:49:26
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-27 18:06:10
 */
import React from "react";
import "./projectlist.css";
import FetchData from "../network/fetchData";
import sourceCodeImg from "../imgs/source-code.png";
import memberImg from "../imgs/member.png";
import settingImg from "../imgs/setting.png";
import { Link } from "react-router-dom";

export class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedIdx: 0
    };
  }

  componentDidMount() {
    FetchData.fetchProjectList(response => {
      if (response.msg.code === 0)
        this.setState({
          projects: response.projects
        });
    });
  }

  _projectItemOnClick(event, item, index) {
    this.setState({
      selectedIdx: index
    });
  }

  render() {
    return this.state.projects.map((project, idx) => {
      return (
        <div
          className="projectDiv"
          key={project.project_id}
          style={
            this.state.projects[this.state.selectedIdx].project_id ===
            project.project_id
              ? {
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "lightgray"
                }
              : null
          }
          onClick={event => this._projectItemOnClick(event, project, idx)}
        >
          <div className="projectTitleDiv">{project.project_name}</div>
          <div
            style={{
              // backgroundColor: "lightgray",
              display: "flex",
              flex: 1
            }}
          >
            {/* <LineChart
              width={300}
              height={100}
              data={this.state.projectsSimpleLineCharts[index]}
              margin={{
                top: 15,
                right: 10,
                left: 10,
                bottom: 5
              }}
            >
              <Line
                type="monotone"
                dataKey="yvalue"
                stroke="lightgray"
                dot={{ r: 2, fill: "gray" }}
                label={{
                  dy: -10,
                  fill: "gray",
                  fontSize: 9,
                  textAnchor: "middle"
                }}
              />
            </LineChart> */}
          </div>

          <div className="projectOtherInfoDiv">
            <img className="sourceCodeImg" src={sourceCodeImg} alt="" />
            <div className="sourceCode">{project.source_code}</div>
            <img className="sourceCodeImg" src={memberImg} alt="" />
            {project.members}
            <div
              className="settingDiv"
              style={{
                visibility: project.creator === 0 ? "visible" : "hidden"
              }}
            >
              <Link
                to={`/project/edit/${this.state.ttd}/${project.project_id}`}
              >
                <img className="settingImg" src={settingImg} alt="" />
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
}
