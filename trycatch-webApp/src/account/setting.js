/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-09-17 12:09:33 
 * @Last Modified by: Young
 * @Last Modified time: 2019-04-17 11:13:53
 */
import React from "react";
import "./setting.css";
import NetClient from "../network/netclient";
import md5 from "md5";
import { Link } from "react-router-dom";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      alertInfo: "",
      oldPassword: "",
      newPassword: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountName !== nextProps.accountName) {
      this.setState({ accountName: nextProps.accountName });
    }
  }

  render() {
    return (
      <div
        onClick={event => {
          this.setState({ alertInfo: "" });
          this.props.onClick(event);
        }}
        style={{
          justifyContent: "center",
          // alignItems: "center",
          display: "flex",
          flex: 1,
          width: "100%",
          height: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      >
        <div
          style={
            {
              display: "flex",
              justifyContent: "flex-end",
              width: 1000,
              height: "auto",
              // backgroundColor: "red"
            }
            // backgroundColor: "red"
          }
        >
          <div
            onClick={event => event.stopPropagation()}
            style={
              {
                display: "flex",
                width: 300,
                height: 400,
                backgroundColor: "white",
                marginTop: 60,
                flexDirection: "column",
                padding: 20
              } // marginRight: -230,
            }
          >
            <div style={{ fontSize: 16, color: "gray" }}>
              I am {this.state.accountName}
            </div>
            <div
              style={{
                visibility:
                  this.state.alertInfo.length > 0 ? "visible" : "hidden",
                display: "flex",
                backgroundColor: global.tt_constant.theme_yellow,
                width: 280,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20
              }}
            >
              {this.state.alertInfo}
            </div>
            <h2>Change password</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="passwordLabel">Old</div>
              <input
                type="password"
                className="passwordInput"
                value={this.state.oldPassword}
                onChange={event =>
                  this.setState({
                    alertInfo: "",
                    oldPassword: event.target.value
                  })
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <div className="passwordLabel">New</div>
              <input
                type="password"
                className="passwordInput"
                value={this.state.newPassword}
                onChange={event =>
                  this.setState({
                    alertInfo: "",
                    newPassword: event.target.value
                  })
                }
              />
            </div>
            <div
              className="changePasswordDiv"
              onClick={event => this._changePassword(event)}
            >
              Change
            </div>
            <Link 
            onClick={(event)=>{sessionStorage.removeItem(global.tt_constant.UID)}}
             to="/">
              <div
                className="changePasswordDiv"
                style={{ backgroundColor: "red", marginTop: 60 }}
              >
                logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  _changePassword(event) {
    if (
      this.state.oldPassword.length < 6 ||
      this.state.newPassword.length < 6
    ) {
      this.setState({
        alertInfo: global.tt_constant.home_password_length_noenough
      });
    } else {
      NetClient.netPost(
        global.tt_constant.net_url_changepassword,
        {
          uid: this.props.ttd,
          old: md5(this.state.oldPassword),
          new: md5(this.state.newPassword)
        },
        response => {
          this.setState({
            alertInfo: response.msg.content,
            oldPassword: "",
            newPassword: ""
          });
        }
      );
    }
  }
}
