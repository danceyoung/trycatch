/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-09-12 09:54:49 
 * @Last Modified by: Young
 * @Last Modified time: 2018-10-25 15:24:36
 */
import React from "react";

export default class FullScreenBug extends React.Component {

  render() {
    return (
      <div
        onClick={event => this.props.history.goBack()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      >
        <div
          onClick={event => event.stopPropagation()}
          style={{
            display: "flex",
            width: "50%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: global.tt_constant.theme_headerbg,
            color: global.tt_constant.theme_yellow,
            fontFamily: "Menlo",
            fontSize: "16px",
            padding:"20px"
          }}
        >
          {this.props.alertContent}
        </div>
      </div>
    );
  }
}
