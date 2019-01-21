/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-21 17:10:49 
 * @Last Modified by: Young
 * @Last Modified time: 2018-10-09 17:34:59
 */
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NetClient from "./network/netclient";
import "./constant";
import Utils from "./utils/utils";
import md5 from "md5";
import Header from "./widget/header";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorAlert: false,
      errorAlertInfo: ""
    };
  }

  _signin(event) {
    event.preventDefault();
    if (!Utils.checkEmailValid(this.state.email)) {
      this.setState({
        errorAlert: true,
        errorAlertInfo: global.tt_constant.home_account_invalidemail
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        errorAlert: true,
        errorAlertInfo: global.tt_constant.home_password_length_noenough
      });
      return;
    }
    NetClient.netPost(
      global.tt_constant.net_url_signin,
      { account_name: this.state.email, password: md5(this.state.password) },
      response => {
        if (response.msg.code !== 0) {
          this.setState({
            errorAlert: true,
            errorAlertInfo: global.tt_constant.home_account_pw_nomatch
          });
        } else {
          this.props.history.push("/dashboard/" + response.uid);          
        }
      }
    );
  }

  _onEnterKeyUp(event) {
    if (event.keyCode === 13) {
      this._signin(event);
    }
  }

  render() {
    return (
      <div className="ttHomeRootDiv">
        <Header settingVisible={"hidden"} />
        <div className="ttHomeContent1">
          <div className="ttHomeContent1-left">
            <p className="ttHomeContent1-left-p">
              For developers, by developers
            </p>
            <p />
            <p>
              Try catching exception or other necessary information inside your
              application,
            </p>
            <p>
              once they are catched, immediately send a notification to your
              smartphone.
            </p>
          </div>
          <div className="ttHomeContent1-right">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                width: "80%",
                backgroundColor: global.tt_constant.theme_yellow,
                marginBottom: 10,
                visibility: this.state.errorAlert ? "visible" : "hidden"
              }}
            >
              {this.state.errorAlertInfo}
            </div>
            <div className="ttContent1-right-inputdiv">
              Email
              <input
                onChange={event =>
                  this.setState({
                    errorAlert: false,
                    email: event.target.value
                  })
                }
                type="text"
                className="ttContent1-right-input"
                placeholder="you@example.com"
              />
            </div>
            <div className="ttContent1-right-inputdiv">
              Password
              <input
                onChange={event =>
                  this.setState({
                    errorAlert: false,
                    password: event.target.value
                  })
                }
                type="password"
                className="ttContent1-right-input"
                placeholder="create or input your password"
                onKeyUp={event => {
                  this._onEnterKeyUp(event);
                }}
              />
            </div>
            <Link
              onClick={event => {
                this._signin(event);
              }}
              to="/dashboard"
              className="ttContent1-right-signin"
            >
              Sign in
            </Link>
            <div
              style={{
                width: "80%",
                fontSize: 11,
                display: "flex",
                marginTop: 5,
                color: "gray"
              }}
            >
              Signin will call signup action if the email doesn't exist.
            </div>
          </div>
        </div>
        <section className="ttContent2">
          <div className="ttContent2-div">
            <p>Try catching</p>
          </div>
          <div className="ttContent2-div">
            <p>Try notifying</p>
          </div>
          <div className="ttContent2-div">
            <p>Finally fixed</p>
          </div>
        </section>
      </div>
    );
  }
}
