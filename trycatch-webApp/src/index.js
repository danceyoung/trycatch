/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2018-04-23 15:31:55
 * @Last Modified by: Young
 * @Last Modified time: 2019-04-17 16:44:48
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard"
import "./index.css";
import NewProject from "./project/newproject"
import EditProject from "./project/editproject"
import { stringify } from "querystring";
// var Tesseract = window.Tesseract;
export default class TryTryIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountImgVisible: "visible",
      uid: ""
    };
  }

  // componentDidMount(){
  //   const script = document.createElement("script");

  //   script.src = "<script src='https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'></script>";
  //   script.async = true;

  //   document.header.appendChild(script);
  // }

  _loginCallback(user_id) {
    if (user_id.length > 10) {
      this.setState({ accountImgVisible: "visible", uid: user_id });
    }
  }

  componentWillUpdate(nextProps) {
    console.log("this.props: " + stringify(this.props) + " nextProps: " + stringify(nextProps))
  }

  render() {
    return <BrowserRouter basename="/trycatchfinally">
        <div className="rootView">
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route path="/dashboard/:ttd" render={props => <Dashboard {...props} />} />
          <Route path="/project/new/:ttd" render={props => <NewProject {...props} />} />
          <Route path="/project/edit/:ttd/:ttpd" render={props => <EditProject {...props} />} />
        </div>
      </BrowserRouter>;
  }
}

ReactDOM.render(<TryTryIndex />, document.getElementById("root"));
