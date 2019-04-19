/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-07-06 14:00:04 
 * @Last Modified by: Young
 * @Last Modified time: 2019-04-17 16:58:39
 */
import React from 'react'
import './screenalert.css'

export default class ScreenAlert extends React.Component {
  
  componentDidMount(){
    console.log(JSON.stringify(this.props))
  }

  render() {
    return (
      <div
        onClick={(event) => this.props.history.goBack()}
        style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="alertDiv" onClick={(event) => event.stopPropagation()}>
          <div className="alertDivHeader">
            Alert
          </div>
          <div className="alertDivContent">
            {this.props.alertContent}
          </div>
          <div className="alertDivBottom" 
          onClick={(event)=>{this.props.history.goBack();this.props.okClick();}}>
            {this.props.okButtonTitle}
          </div>
        </div>
      </div>
    )
  }
}