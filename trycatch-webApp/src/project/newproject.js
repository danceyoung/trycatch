/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-06 14:23:05 
 * @Last Modified by: Young
 * @Last Modified time: 2019-06-05 14:59:29
 */
import React from "react";
import { Link } from "react-router-dom";
import "./newproject.css";
import "../constant";
import FetchData from "../network/fetchData";
import Utils from "../utils/utils";
import trashImg from "../imgs/trash.png";
import notifyImg from "../imgs/notify.png";
import leftarrow from "../imgs/leftarrow.png";
import Header from "../widget/header";

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    console.log("newproject js "+JSON.stringify(this.props)+"--"+JSON.stringify(this.props.history))
    this.state = {
      ttd: this.props.match.params.ttd,
      alertInfo: "",
      projectName: "",
      projectLanguage: "",
      addMemberEmailValueValid: false,
      addMemberEmailValue: "",
      addMemberAliasValue: "",
      members: [],
      receiveFromDivMarginTop: 10,
      selectedMember: null,
      receiveFromDivVisible: "hidden"
    };
  }

  _addMemeber(e) {
    // e.stopPropagation();
    if (
      !(
        this.state.projectName.length > 0 &&
        this.state.projectLanguage.length > 0
      )
    )
      return;
    if (!this.state.addMemberEmailValueValid) {
      this.setState({
        alertInfo: global.tt_constant.project_new_memberemail_invalid
      });
      return;
    }
    if (this.state.addMemberAliasValue.length === 0) {
      this.setState({
        alertInfo: global.tt_constant.project_new_memberalias_required
      });
      return;
    }
    if (
      this.state.members.findIndex(
        ele => ele.email === this.state.addMemberEmailValue
      ) !== -1
    ) {
      this.setState({
        alertInfo: global.tt_constant.project_new_memberemail_existed
      });
      return;
    }

    var preMembers = this.state.members.slice();
    var addMember = [
      {
        email: this.state.addMemberEmailValue,
        alias: this.state.addMemberAliasValue,
        receive_from_list: this.state.addMemberEmailValue
      }
    ];
    this.setState({
      members: preMembers.concat(addMember),
      addMemberEmailValueValid: false,
      addMemberEmailValue: "",
      addMemberAliasValue: ""
    });
  }

  _save(e) {
    // e.stopPropagation();
    if (this.state.members.length === 0) return;
    // console.log("saving project newed")
    FetchData.newProject({
      project_name: this.state.projectName,
      language: this.state.projectLanguage,
      created_by: this.state.ttd,
      members: this.state.members
    }).then(response => {
      if (response.msg.code !== 0) {
        this.setState({ alertInfo: response.msg.content });
      } else {
        this.props.history.goBack();
      }
    });
  }

  _onProjectNameChange(event) {
    this.setState({
      projectName: event.target.value,
      alertInfo: ""
    });
  }

  _onProjectLanguageChange(event) {
    this.setState({
      projectLanguage: event.target.value,
      alertInfo: ""
    });
  }

  _deleteMemberCallback(event, email) {
    event.preventDefault();
    var preMembers = this.state.members.slice();
    this.setState({
      members: preMembers.filter(item => item.email !== email)
    });
    // this.props.history.goBack()
  }

  // _deleteLinkClick(event, item) {
  //   // event.preventDefault()
  //   this.setState({ selectedMember: item })
  //   // this.props.history.push('/project/alert/' + item.email)
  // }

  _setReceiveFromDivParams(member) {
    var index = this.state.members.findIndex(ele => ele.email === member.email);
    // console.log('this is select ' + index + '  ' + selectedMemberEmail)
    this.setState({
      receiveFromDivVisible: "visible",
      receiveFromDivMarginTop: index * 35 + (index + 1) * 10,
      selectedMember: member
    });
  }

  _setMemberReceiveFromList(checked, item) {
    var currentMember = this.state.selectedMember;
    var currentMemberReceiveList = currentMember.receive_from_list.split(",");
    if (checked) {
      currentMemberReceiveList.push(item.email);
    } else {
      currentMemberReceiveList = currentMemberReceiveList.filter(
        ele => ele !== item.email
      );
    }
    currentMember.receive_from_list = currentMemberReceiveList.toString();
    this.setState({
      selectedMember: currentMember
    });
    // console.log(this.state.selectedMember.receiveFromList)
  }

  render() {
    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
        <Header settingVisible={"visible"} />
          <div className="npRootDiv">
            <div className="npHeaderDiv">
              <h2>New a project</h2>
              <div className="npHeaderRightDiv">
                <div
                  style={{
                    visibility:
                      this.state.alertInfo.length > 0 ? "visible" : "hidden",
                    display: "flex",
                    backgroundColor: global.tt_constant.theme_yellow,
                    width: 400,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {this.state.alertInfo}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "bold", height: 20, marginTop: 10 }}>
              Project
            </div>
            <div className="npLabelInputDiv">
              <div className="npLabel">name</div>
              <input
                onChange={event => this._onProjectNameChange(event)}
                type="text"
                className="npInput"
              />
            </div>
            <div className="npLabelInputDiv">
              <div className="npLabel">language</div>
              <input
                onChange={event => this._onProjectLanguageChange(event)}
                type="text"
                className="npInput"
              />
            </div>
            <div className="npLabelInputDiv" style={{ marginTop: 40 }}>
              <div className="npLabel" style={{ fontWeight: "bold" }}>
                Members
              </div>
              <div className="npInput">
                <input
                  value={this.state.addMemberEmailValue}
                  onChange={event =>
                    this.setState({
                      alertInfo: "",
                      addMemberEmailValueValid: Utils.checkEmailValid(
                        event.target.value
                      ),
                      addMemberEmailValue: event.target.value
                    })
                  }
                  placeholder="member's email"
                  type="text"
                  className="npAddMemberEmailInput"
                />
                <input
                  value={this.state.addMemberAliasValue}
                  onChange={event =>
                    this.setState({
                      addMemberAliasValue: event.target.value,
                      alertInfo: ""
                    })
                  }
                  placeholder="member's alias"
                  type="text"
                  className="npAddMemberAliasInput"
                />
                <div
                  style={{
                    opacity:
                      this.state.projectName.length > 0 &&
                      this.state.projectLanguage.length > 0
                        ? 1
                        : 0.6,
                    cursor: "pointer",
                    marginLeft: 10,
                    width: 30,
                    height: 30,
                    display: "flex",
                    backgroundColor: "lightgray",
                    fontSize: 20,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onClick={e => this._addMemeber(e)}
                >
                  +
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {this.state.members.map((item, index) => {
                  return (
                    <div
                      className="npMemberRowDiv"
                      style={{
                        backgroundColor:
                          this.state.selectedMember !== null &&
                          this.state.selectedMember.email === item.email
                            ? "lightgray"
                            : global.tt_constant.theme_selected_color
                      }}
                      key={item.email + index}
                    >
                      <div className="npMemberEmailDiv">{item.email}</div>
                      <div className="npMemberAliasDiv">{item.alias}</div>
                      <div className="npMemberActionDiv">
                        <Link
                          onClick={event =>
                            this._deleteMemberCallback(event, item.email)
                          }
                          to={"/project/memberdelete/" + item.email}
                        >
                          <img
                            className="npMemberActionImg"
                            src={trashImg}
                            alt={global.tt_constant.memeber_delete_label}
                          />
                        </Link>
                        <img
                          onClick={() => this._setReceiveFromDivParams(item)}
                          className="npMemberActionImg"
                          src={notifyImg}
                          alt={global.tt_constant.memeber_notify_label}
                        />
                      </div>
                    </div>
                  );
                })}

                <div
                  className="npSaveProjectAndMemberDiv"
                  style={{ opacity: this.state.members.length > 0 ? 1 : 0.6 }}
                  onClick={e => this._save(e)}
                >
                  New project
                </div>
              </div>

              <div
                style={{
                  visibility: this.state.receiveFromDivVisible,
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 10,
                  marginTop: this.state.receiveFromDivMarginTop,
                  backgroundColor: "lightgray"
                }}
              >
                <img src={leftarrow} alt="" className="npLeftArrowImg" />

                <div style={{ margin: 10, marginTop: -30 }}>
                  {this.state.selectedMember
                    ? this.state.selectedMember.alias +
                      " " +
                      global.tt_constant.project_new_receivefrom_alert
                    : ""}
                </div>

                <div className="npReceiveListDiv">
                  {this.state.selectedMember
                    ? this.state.members
                        .filter(
                          ele1 => ele1.email !== this.state.selectedMember.email
                        )
                        .map(ele => {
                          return (
                            <div
                              className="npReceiveListItemDiv"
                              key={ele.email}
                            >
                              <input
                                checked={this.state.selectedMember.receive_from_list
                                  .split(",")
                                  .includes(ele.email)}
                                type="checkbox"
                                onChange={event =>
                                  this._setMemberReceiveFromList(
                                    event.target.checked,
                                    ele
                                  )
                                }
                              />
                              <div className="npReceiveListItemTitleDiv">
                                {ele.alias}
                                <div
                                  style={{
                                    marginTop: 3,
                                    fontSize: 12,
                                    color: "darkgray",
                                    fontWeight: "normal"
                                  }}
                                >
                                  {ele.email}
                                </div>
                              </div>
                            </div>
                          );
                        })
                    : null}
                </div>
              </div>
            </div>
          </div>
          {/* <Route
            path="/project/memberdelete/:email"
            render={(props) => <ScreenAlert {...props}
              alertContent={"Deleting a member is no going back, but will retain these historical data."}
              okButtonTitle={"Delete"}
              okClick={() => this._deleteMemberCallback(props.match.params.email)} />}
          >
          </Route> */}
        </div>
      //  onClick={(event) => this._deleteLinkClick(event, item)}
    );
  }
}
