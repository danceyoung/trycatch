/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2018-04-23 15:31:55
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-24 14:45:35
 */
import React from "react";
import "./app.css";
import { Link } from "react-router-dom";
import Header from "./widget/header";
import sourceCodeImg from "./imgs/source-code.png";
import memberImg from "./imgs/member.png";
import settingImg from "./imgs/setting.png";
import NetClient from "./network/netclient";
import "./constant";
import Route from "react-router-dom/Route";
import FullScreenBug from "./project/fullscreenbug.js";
import Setting from "./account/setting";
import { LineChart, Line } from "recharts";
import PReport from "./project/projectlinechart.js";
// var Tesseract = window.Tesseract;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      projectsSimpleLineCharts: [],
      selectedProjectIdx: 0,
      selectedProjectReceiveFromList: [],
      selectedProjectBugs: [],
      selectedBug: "",
      activityDivSelected: true,

      noProjects: true,
      errorAlert: false,
      errorAlertInfo: "",

      fetchPage: 1,

      noMoreBugsVisible: "hidden",
      noBugsVisible: "hidden",

      noBugAlert: global.tt_constant.main_no_bugs
    };
  }

  componentDidMount() {
    console.log("params " + JSON.stringify(this.props));
    NetClient.netPost(
      global.tt_constant.net_url_projects,
      { uid: this.props.match.params.ttd },
      response => {
        if (response.msg.code !== 0) {
          this.setState({
            errorAlert: true,
            errorAlertInfo: response.msg.content
          });
        } else {
          this.setState(
            () => {
              return {
                projects: response.projects,
                selectedProjectIdx: 0,
                noProjects: false
              };
            },
            () => {
              this._getCurrentProjectBugs();
              this._getAllProjectBugLineChartsData();
            }
          );
        }
      }
    );
    this.setState({
      ttd: this.props.match.params.ttd
    });
  }

  _getCurrentProjectBugs() {
    this._getProjectMembers(
      this.state.projects[this.state.selectedProjectIdx].project_id,
      (projectId, debuggerids) => {
        this._getProjectBugs(projectId, debuggerids);
      }
    );
  }

  _getAllProjectBugLineChartsData() {
    this.state.projects.map((project, idx) => {
      this._getBugSimpleLineChartsData(project, idx);
    });
  }

  _getBugSimpleLineChartsData(ele, idx) {
    // console.log("getbugsimplelinechartsdata "+JSON.stringify(this.state.projects))
    this._getProjectMembers(ele.project_id, (projectId, debuggerids) => {
      NetClient.netPost(
        global.tt_constant.net_url_projectbugschart,
        {
          uid: ele.created_by,
          project_id: projectId,
          debugger_ids: debuggerids
        },
        res => {
          if (res.msg.code === 0) {
            var tempLineCharts = this.state.projectsSimpleLineCharts;
            tempLineCharts[idx] = res.chart.map(ele => {
              return { yvalue: ele };
            });
            this.setState({
              projectsSimpleLineCharts: tempLineCharts
            });
            // console.log("linechart "+idx + JSON.stringify(res.chart))
          }
        }
      );
    });
  }

  _getProjectMembers(projectId, callback) {
    NetClient.netPost(
      global.tt_constant.net_url_receivefromlist,
      {
        uid: this.state.ttd,
        project_id: projectId
      },
      response => {
        if (response.msg.code !== 0) {
          if (response.msg.code === 20 && projectId === this.state.projects[this.state.selectedProjectIdx].project_id) {
            this.setState({
              noBugsVisible: "visible",
              noBugAlert: response.msg.content
            });
          }
        } else {
          // console.log(JSON.stringify(response.receivefromlist))
          if (
            projectId ===
            this.state.projects[this.state.selectedProjectIdx].project_id
          ) {
            this.setState({
              selectedProjectReceiveFromList: response.receive_from_list.map(
                ele => {
                  ele["selected"] = true;
                  return ele;
                }
              )
            });
          }

          if (callback !== null) {
            callback(
              projectId,
              response.receive_from_list.map(ele => {
                return ele["user_id"];
              })
            );
          }
        }
      }
    );
  }

  _getProjectBugs(projectId, debuggerids) {
    NetClient.netPost(
      global.tt_constant.net_url_projectbugs,
      {
        uid: this.state.ttd,
        project_id: projectId,
        debugger_ids: debuggerids,
        fetch_page: this.state.fetchPage
      },
      response => {
        if (response.msg.code !== 0) {
          if (response.msg.code === global.tt_constant.msg_no_more_code) {
            if (this.state.fetchPage === 1) {
              this.setState({
                noBugsVisible: "visible",
                noBugAlert: global.tt_constant.main_no_bugs
              });
            } else if (this.state.fetchPage > 1) {
              this.setState({ noMoreBugsVisible: "visible" });
            }
          }
        } else {
          // console.log(JSON.stringify(response.receivefromlist))
          this.setState(state => {
            return {
              selectedProjectBugs: state.selectedProjectBugs.concat(
                response.bugs
              ),
              fetchPage: state.fetchPage + 1
            };
          });
        }
      }
    );
  }

  _projectItemOnClick(event, project, index) {
    // if (project.project_id !== this.state.selectedProject.project_id) {
    this.setState(
      () => {
        return {
          selectedProjectReceiveFromList: [],
          // projectSimpleLineCharts: [],
          selectedProjectBugs: [],
          selectedProjectIdx: index,
          fetchPage: 1,
          noMoreBugsVisible: "hidden",
          noBugsVisible: "hidden",
          nextButtonVisible: "visible"
        };
      },
      () => {
        this._getProjectMembers(
          project.project_id,
          (projectId, debuggerids) => {
            this._getBugSimpleLineChartsData(project, index);
            this._getProjectBugs(projectId, debuggerids);
          }
        );
      }
    );
    // }
  }

  _createProjects() {
    let projectsView = this.state.projects.map((item, index) => {
      return (
        <div
          className="projectDiv"
          key={item.project_id}
          style={
            this.state.projects[this.state.selectedProjectIdx].project_id ===
            item.project_id
              ? {
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "lightgray"
                }
              : null
          }
          onClick={event => this._projectItemOnClick(event, item, index)}
        >
          <div className="projectTitleDiv">{item.project_name}</div>
          <div
            style={{
              // backgroundColor: "lightgray",
              display: "flex",
              flex: 1
            }}
          >
            <LineChart
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
            </LineChart>
          </div>

          <div className="projectOtherInfoDiv">
            <img className="sourceCodeImg" src={sourceCodeImg} alt="" />
            <div className="sourceCode">{item.source_code}</div>
            <img className="sourceCodeImg" src={memberImg} alt="" />
            {item.members}
            <div
              className="settingDiv"
              style={{
                visibility: item.creator === 0 ? "visible" : "hidden"
              }}
            >
              <Link to={`/project/edit/${this.state.ttd}/${item.project_id}`}>
                <img className="settingImg" src={settingImg} alt="" />
              </Link>
            </div>
          </div>
        </div>
      );
    });

    return projectsView;
  }

  async _debugerOnClick(event, debuger) {
    event.preventDefault();
    console.log(JSON.stringify(debuger));
    debuger.selected = !debuger.selected;
    await this.setState(
      state => {
        return {
          selectReceiveFromList: state.selectReceiveFromList,
          selectedProjectBugs: [],
          fetchPage: 1,
          noMoreBugsVisible: "hidden",
          noBugsVisible: "hidden"
        };
      },
      () => {
        var debuggerids = this.state.selectedProjectReceiveFromList
          .filter(ele => ele.selected === true)
          .map(ele => {
            return ele.user_id;
          });
        this._getProjectBugs(
          this.state.projects[this.state.selectedProjectIdx].project_id,
          debuggerids
        );
      }
    );
  }

  _tabOnClick(event, tabIndex) {
    this.setState({ activityDivSelected: tabIndex === 0 ? true : false });
    // if (tabIndex === 1) {
    //   this.setState({
    //     selectedProjectIdx: this.state.projects.indexOf(
    //       this.state.selectedProject
    //     )
    //   });
    // }
  }

  _nextButtonOnClick(event) {
    var debuggerids = this.state.selectReceiveFromList
      .filter(ele => ele.selected === true)
      .map(ele => {
        return ele.user_id;
      });
    this._getProjectBugs(
      this.state.projects[this.state.selectedProjectIdx].project_id,
      debuggerids
    );
  }

  render() {
    return (
      <div className="superDiv">
        <Header settingVisible={"visible"} ttd={this.state.ttd} />
        <Route
          path="/dashboard/:ttd"
          render={({ match }) => {
            return (
              <div className="rootDiv">
                <div className="leftDiv">
                  <div className="projectHeaderDiv">
                    <h2>Projects</h2>
                    <Link
                      to={`/project/new/${this.state.ttd}`}
                      className="newProjectLink"
                    >
                      New a project
                    </Link>
                  </div>
                  {this._createProjects(match)}
                </div>

                <div className="rightDiv">
                  <div
                    style={{
                      visibility:
                        this.state.noProjects || this.state.errorAlert
                          ? "visible"
                          : "hidden",
                      display: "flex",
                      backgroundColor: global.tt_constant.theme_yellow,
                      width: 400,
                      padding:
                        this.state.noProjects || this.state.errorAlert ? 10 : 0,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop:
                        this.state.noProjects || this.state.errorAlert ? 10 : 0
                    }}
                  >
                    {this.state.errorAlertInfo}
                  </div>
                  <div
                    className="tabDiv"
                    style={{
                      visibility: this.state.noProjects ? "hidden" : "visible"
                    }}
                  >
                    <Link
                      onClick={event => this._tabOnClick(event, 0)}
                      to={`${this.props.match.url}`}
                      className="tabLink"
                    >
                      <div
                        className="tabTextDiv"
                        style={{
                          borderBottomColor: this.state.activityDivSelected
                            ? global.tt_constant.theme_yellow
                            : "transparent"
                        }}
                      >
                        Activity
                      </div>
                    </Link>
                    <Link
                      onClick={event => this._tabOnClick(event, 1)}
                      to={`${this.props.match.url}/report`}
                      className="tabLink"
                    >
                      <div
                        className="tabTextDiv"
                        style={{
                          borderBottomColor: !this.state.activityDivSelected
                            ? global.tt_constant.theme_yellow
                            : "transparent"
                        }}
                      >
                        Report
                      </div>
                    </Link>
                  </div>
                  <Route
                    path={`${this.props.match.path}`}
                    exact
                    component={() => (
                      <div className="activityRootDiv">
                        <div className="debuggedDiv">
                          {this.state.selectedProjectReceiveFromList.map(
                            ele => {
                              return (
                                <div
                                  className="debuggedTextDiv"
                                  title={ele.email}
                                  key={ele.email}
                                  style={{
                                    backgroundColor: ele.selected
                                      ? global.tt_constant.theme_yellow
                                      : global.tt_constant
                                          .theme_debuger_noneselect_color,
                                    color: ele.selected
                                      ? "black"
                                      : global.tt_constant.theme_blue
                                  }}
                                  onClick={event => {
                                    this._debugerOnClick(event, ele);
                                  }}
                                >
                                  {ele.alias}
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div style={{ visibility: this.state.noBugsVisible }}>
                          {this.state.noBugAlert}
                        </div>
                        {this.state.selectedProjectBugs.map((ele, index) => {
                          return (
                            <div
                              className="bugDiv"
                              key={`${ele.user_id}${index}`}
                            >
                              <div className="bugAuthorDiv">
                                <div className="avatar">
                                  {ele.alias.substr(0, 1).toLocaleUpperCase()}
                                </div>
                                debugged by {ele.alias}
                              </div>
                              <Link
                                onClick={event => {
                                  this.setState({
                                    selectedBug: ele.content
                                  });
                                }}
                                to={`${this.props.match.url}/fullscreenbug`}
                                className="bugContentLink"
                              >
                                <div className="bugContentDiv">
                                  {ele.content}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                        <div className="nextDiv">
                          <div
                            style={{
                              visibility: this.state.noMoreBugsVisible
                            }}
                          >
                            {global.tt_constant.main_no_more_bugs}
                          </div>
                          <div
                            onClick={event => this._nextButtonOnClick(event)}
                            className="nextTextDiv"
                            style={{
                              visibility:
                                this.state.noBugsVisible === "hidden"
                                  ? "visible"
                                  : "hidden"
                            }}
                          >
                            Next
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <Route
                    path={`${match.url}/report`}
                    render={() => (
                      <PReport
                        projectId={
                          this.state.projects[this.state.selectedProjectIdx]
                            .project_id
                        }
                        debugers={this.state.selectedProjectReceiveFromList}
                        allData={
                          this.state.projectsSimpleLineCharts[
                            this.state.selectedProjectIdx
                          ]
                        }
                      />
                    )}
                  />
                  <Route
                    path={`${this.props.match.path}/fullscreenbug`}
                    render={props => (
                      <FullScreenBug
                        {...props}
                        alertContent={this.state.selectedBug}
                      />
                    )}
                  />
                </div>
              </div>
            );
          }}
        />
        <Route
          path={`${this.props.match.path}/accountsetting`}
          render={props => <Setting {...props} />}
        />
      </div>
    );
  }
}
