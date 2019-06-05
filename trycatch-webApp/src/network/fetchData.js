/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2019-05-27 15:38:40
 * @Last Modified by: Young
 * @Last Modified time: 2019-06-05 15:29:18
 */
import NetClient from "./netclient.js";
import Utils from "../utils/utils"
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

  static fetchProjectBugList(body) {
    return new Promise((resolve, reject) => {
      let uid = sessionStorage.getItem(global.tt_constant.UID);
      if (uid !== null) {
        body["uid"] = uid;
        NetClient.netPost(global.tt_constant.net_url_projectbugs, body).then(
          response => {
            resolve(response);
          }
        );
      }
    });
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

  static fetchProjectDetail(body) {
    return new Promise((resolve, reject) => {
      NetClient.netPost(global.tt_constant.net_url_projectdetail, body).then(
        response => {
          resolve(response);
        }
      );
    });
  }

  static saveProject(body) {
    return new Promise((resolve, reject) => {
      NetClient.netPost(global.tt_constant.net_url_projectsave, body).then(
        response => {
          resolve(response);
        }
      );
    });
  }

  static newProject(body) {
    return new Promise((resolve, reject) => {
      body["created_by"] = Utils.getUID();
      NetClient.netPost(global.tt_constant.net_url_newproject, body).then(
        response => resolve(response)
      );
    });
  }

  static deleteProject(body) {
    return new Promise((resolve, reject) => {
      let uid = sessionStorage.getItem(global.tt_constant.UID);
      body["uid"] = uid
      NetClient.netPost(global.tt_constant.net_url_projectdelete, body).then(
        response => resolve(response)
      );
    });
  }
}
