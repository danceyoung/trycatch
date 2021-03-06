/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-09-19 10:51:57 
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-24 15:36:24
 */
import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logoImg from "../imgs/ttlogo1.png";
import accountImg from "../imgs/accountimg.png";
import githubImg from "../imgs/github.png"
import iOSQRImg from "../imgs/iOSQR.png"
import Setting from "../account/setting";
import NetClient from "../network/netclient";
import "../constant";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingVisible: "hidden",
      accountName: ""
    };
  }

  componentDidMount() {
    this.setState({
      settingVisible: this.props.settingVisible,
      settingViewVisibility: "hidden"
    });
  }

  _netProfile() {
    NetClient.netPost(
      global.tt_constant.net_url_profile,
      {
        uid: this.props.ttd
      },
      response => {
        if (response.msg.code === 0) {
          this.setState({ accountName: response.account_name });
        }
      }
    );
  }

  render() {
    console.log("--- " + JSON.stringify(this.props));
    return (
      <div className="ttHeader">
        <div className="headerCenterDiv">
          <Link
            to={
              sessionStorage.getItem(global.tt_constant.UID) === null
                ? "/"
                : "/dashboard/" +
                  sessionStorage.getItem(global.tt_constant.UID)
            }
          >
            <img className="ttHeader-logo" src={logoImg} alt="" />
          </Link>
          <div className="accountDiv">
            <Link
              onClick={event => {
                event.preventDefault();
                this.setState({ settingViewVisibility: "visible" });
                this._netProfile();
              }}
              to={`/accountsetting`}
              style={{ visibility: this.state.settingVisible }}
            >
              <img
                className="accountImg"
                src={accountImg}
                alt=""
                style={{ width: 15, height: 15 }}
              />
            </Link>
            <a
              style={{ marginLeft: 5 }}
              target="_blank"
              href={"https://github.com/danceyoung/trycatch"}
            >
              <img
                alt="github repository"
                src={githubImg}
                style={{ width: 25, height: 25 }}
              />
            </a>
            <a
              style={{ marginLeft: 5 }}
              target="_blank"
              href={
                "https://itunes.apple.com/cn/app/trycatch/id1463000084?mt=8"
              }
            >
              <img
                alt="iOS App Store"
                src={iOSQRImg}
                style={{ width: 18, height: 18 }}
              />
            </a>
          </div>
        </div>
        <div style={{ visibility: this.state.settingViewVisibility }}>
          <Setting
            accountName={this.state.accountName}
            ttd={this.props.ttd}
            onClick={event => {
              this.setState({ settingViewVisibility: "hidden" });
            }}
          />
        </div>
      </div>
    );
  }
}
