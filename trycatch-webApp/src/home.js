/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-21 17:10:49 
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-24 15:33:01
 */
import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NetClient from "./network/netclient";
import "./constant";
import Utils from "./utils/utils";
import md5 from "md5";
import Header from "./widget/header";
import nosdksImg from "./imgs/nosdksbox.png";
import realtimeImg from "./imgs/realtime.png"
import pushnotifyImg from "./imgs/pushnotification.png"
import analyzesImg from "./imgs/analyzes.png"
import sloveImg from "./imgs/slove.png"
import iOSQRImg from "./imgs/iOSQR.png"

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

  componentDidMount() {
    console.log("Home component did mount, "+sessionStorage.getItem(global.tt_constant.UID))
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
          sessionStorage.setItem(global.tt_constant.UID, response.uid)
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
            <p className="ttHomeContent1-left-p">For coders, by coders</p>
            <p />
            <p style={{ marginRight: 20 }}>
              Real-time with no special SDKs monitoring, notifying and
              aggregating application exceptions for backend coders.
            </p>
            <div style={{fontSize: 12,}}>
              <img
                alt=""
                src={iOSQRImg}
                style={{ width: 60, height: 60 }}
              />
              <div>App Store</div>
            </div>

            {/* <p>
              Try catching exception or other necessary information inside your
              application,
            </p>
            <p>
              once they are catched, immediately send a notification to your
              smartphone.
            </p> */}
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
          <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <div className="ttContent2-div" style={{ marginLeft: -20 }}>
              <div className="ttContent2-div-image">
                <img
                  alt=""
                  src={nosdksImg}
                  style={{ width: 100, height: 92 }}
                />
              </div>
              <div className="ttContent2-div-right-div">
                <div className="ttContent2-div-right-div-title">
                  No SDKs
                </div>
                <div className="ttContent2-div-right-div-content">
                  You're still under the current coding model, no need to be
                  embed any SDK, you can collect what to be collected.
                </div>
              </div>
            </div>
            <div className="ttContent2-div" style={{ marginLeft: 20 }}>
              <div className="ttContent2-div-image">
                <img
                  alt=""
                  src={realtimeImg}
                  style={{ width: 100, height: 99 }}
                />
              </div>
              <div className="ttContent2-div-right-div">
                <div className="ttContent2-div-right-div-title">
                  Real-time
                </div>
                <div className="ttContent2-div-right-div-content">
                  Using Apache Flume Source watches the specified files, and
                  tails them in nearly real-time once detected new lines
                  appended to the each files. Customing Flume's HTTP Sink,
                  send those content what you marked to server.
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <div className="ttContent2-div" style={{ marginLeft: -20 }}>
              <div className="ttContent2-div-image">
                <img
                  alt=""
                  src={pushnotifyImg}
                  style={{ width: 100, height: 103, opacity: 1 }}
                />
              </div>
              <div className="ttContent2-div-right-div">
                <div className="ttContent2-div-right-div-title">
                  Push Notifications
                </div>
                <div className="ttContent2-div-right-div-content">
                  Now we have TryCatch APP for iOS, you can download,
                  install and login APP, upon receipt of information related
                  you will be immediately sent to your smart phone.
                </div>
              </div>
            </div>
            <div className="ttContent2-div" style={{ marginLeft: 20 }}>
              <div className="ttContent2-div-image">
                <img
                  alt=""
                  src={analyzesImg}
                  style={{ width: 100, height: 99 }}
                />
              </div>
              <div className="ttContent2-div-right-div">
                <div className="ttContent2-div-right-div-title">
                  Analyzes and aggregates
                </div>
                <div className="ttContent2-div-right-div-content">
                  TryCatch App and Web site all will real-time show the
                  information summary or detail through different charts.
                </div>
              </div>
            </div>
          </div>
          <div className="ttContent2-div" style={{ marginLeft: -20 }}>
            <div className="ttContent2-div-image">
              <img
                alt=""
                src={sloveImg}
                style={{ width: 100, height: 100 }}
              />
            </div>
            <div className="ttContent2-div-right-div">
              <div className="ttContent2-div-right-div-title">
                Finally solve
              </div>
              <div className="ttContent2-div-right-div-content">
                Errors are found in your applications, finally you will
                solve these errors. If you can't solve, you can open them to
                seek helps, for example opening to StackOverFlow.
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
