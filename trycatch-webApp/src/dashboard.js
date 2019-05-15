/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-04-28 11:27:30 
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-08 12:44:52
 */
import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./app.css";
import Header from "./widget/header";
import Main from "./app";

export default class DashBoard extends Component {
  componentDidMount() {
    console.log("dashboard props " + JSON.stringify(this.props));
  }

  render() {
    return( 
    <div className="superDiv">
        <Route path="/dashboard/:ttd" component={Main} />
    </div>
    )
  }
}
