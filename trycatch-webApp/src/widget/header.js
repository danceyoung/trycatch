/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-09-19 10:51:57 
 * @Last Modified by: Young
 * @Last Modified time: 2018-10-26 16:07:42
 */
import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logoImg from "../imgs/ttlogo1.png";
import accountImg from "../imgs/accountimg.png";
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
          <Link to="/">
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
              <img className="accountImg" src={accountImg} alt="" style={{}} />
            </Link>
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
