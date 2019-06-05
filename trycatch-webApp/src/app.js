/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2018-04-23 15:31:55
 * @Last Modified by: Young
 * @Last Modified time: 2019-06-05 14:52:01
 */
import React from "react";
import "./app.css";
import { Link } from "react-router-dom";
import Header from "./widget/header";
import NetClient from "./network/netclient";
import "./constant";
import Route from "react-router-dom/Route";
import FullScreenBug from "./project/fullscreenbug.js";
import Setting from "./account/setting";
import PReport from "./project/projectlinechart.js";
import { ProjectList } from "./project/projectlist.js";
import FetchData from "./network/fetchData";
// var Tesseract = window.Tesseract;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: { receive_from_list: [] },
      projectsSimpleLineCharts: [],
      selectedProjectBugs: [],
      selectedBug: "",
      activityDivSelected: true,

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
    let paths = this.props.location.pathname.split("/");
    if (paths[paths.length - 1] === "report") {
      this.setState({
        activityDivSelected: false
      });
    }
  }

  _getProjectBugs(projectId, debuggerids) {
    FetchData.fetchProjectBugList({
      project_id: projectId,
      debugger_ids: debuggerids,
      fetch_page: this.state.fetchPage
    }).then(response => {
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
    });
  }

  async _debugerOnClick(event, debuger) {
    event.preventDefault();
    console.log(JSON.stringify(debuger));
    debuger.selected = !debuger.selected;
    await this.setState(
      state => {
        return {
          selectReceiveFromList: state.selectedProject.receive_from_list,
          selectedProjectBugs: [],
          fetchPage: 1,
          noMoreBugsVisible: "hidden",
          noBugsVisible: "hidden"
        };
      },
      () => {
        var debuggerids = this.state.selectedProject.receive_from_list
          .filter(ele => ele.selected === true)
          .map(ele => {
            return ele.user_id;
          });
        this._getProjectBugs(
          this.state.selectedProject.project_id,
          debuggerids
        );
      }
    );
  }

  _projectDidSelect(project) {
    if (project !== null) {
      this.setState({ selectedProject: project });
      if (project.receive_from_list.length === 0) {
        this.setState({
          noBugsVisible: "visible",
          noBugAlert: global.tt_constant.noneMember,
          selectedProjectReceiveFromList: [],
          selectedProjectBugs: []
        });
      } else {
        this.setState({
          noBugsVisible: "hidden"
        });
        this.setState(
          () => {
            return {
              selectedProjectBugs: [],
              fetchPage: 1
            };
          },
          () => {
            this._getProjectBugs(
              project.project_id,
              project.receive_from_list.map(item => {
                return item["user_id"];
              })
            );
          }
        );
      }
    }
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
    var debuggerids = this.state.selectedProject.receive_from_list
      .filter(ele => ele.selected === true)
      .map(ele => {
        return ele.user_id;
      });
    this._getProjectBugs(this.state.selectedProject.project_id, debuggerids);
  }

  render() {
    console.log(this.state.activityDivSelected);
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
                  <ProjectList
                    projectDidSelect={result => this._projectDidSelect(result)}
                  />
                </div>

                <div className="rightDiv">
                  <div
                    style={{
                      visibility:
                        this.state.selectedProject === null ||
                        this.state.errorAlert
                          ? "visible"
                          : "hidden",
                      display: "flex",
                      backgroundColor: global.tt_constant.theme_yellow,
                      width: 400,
                      padding:
                        this.state.selectedProject === null ||
                        this.state.errorAlert
                          ? 10
                          : 0,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop:
                        this.state.selectedProject === null ||
                        this.state.errorAlert
                          ? 10
                          : 0
                    }}
                  >
                    {this.state.errorAlertInfo}
                  </div>
                  <div
                    className="tabDiv"
                    style={{
                      visibility:
                        this.state.selectedProject === null
                          ? "hidden"
                          : "visible"
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
                          {this.state.selectedProject.receive_from_list.map(
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
                        <div
                          style={{
                            visibility: this.state.noBugsVisible
                          }}
                        >
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
                    component={() => (
                      <PReport project={this.state.selectedProject} />
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
