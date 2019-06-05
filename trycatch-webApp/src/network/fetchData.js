/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2019-05-27 15:38:40
 * @Last Modified by: Young
 * @Last Modified time: 2019-06-04 17:27:58
 */
import NetClient from "./netclient.js";

export default class FetchData {
  static fetchProjectList() {
    return new Promise((resolve, reject) => {
      let uid = sessionStorage.getItem(global.tt_constant.UID);
      if (uid !== null) {
        NetClient.netPost(global.tt_constant.net_url_projects, {
          uid: uid
        }).then(response => {
          resolve(response);
        });
      }
    });
  }

  static fetchUserReceiverListOfProject(body) {
    return new Promise((resolve, reject) => {
      let uid = sessionStorage.getItem(global.tt_constant.UID);
      if (uid !== null) {
        body["uid"] = uid;
        NetClient.netPost(
          global.tt_constant.net_url_receivefromlist,
          body
        ).then(response => {
          resolve(response);
        });
      }
    });
  }

  static fetchProjectBugList(body, callback) {
    let uid = sessionStorage.getItem(global.tt_constant.UID);
    if (uid !== null) {
      body["uid"] = uid;
      NetClient.netPost(global.tt_constant.net_url_projectbugs, body).then(
        response => {
          if (callback !== undefined) {
            callback(response);
          }
        }
      );
    }
  }

  static fetchLinechartData(body) {
    return new Promise((resolve, reject) => {
      NetClient.netPost(global.tt_constant.net_url_projectbugschart, body).then(
        response => {
          resolve(response);
        }
      );
    });
  }
}
