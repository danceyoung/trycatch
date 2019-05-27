/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2019-05-27 15:38:40
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-27 17:21:16
 */
import NetClient from "./netclient.js";

export default class FetchData {
  static fetchProjectList(callback) {
    let uid = sessionStorage.getItem(global.tt_constant.UID);
    if (uid !== null) {
      NetClient.netPost(
        global.tt_constant.net_url_projects,
        {
          uid: uid
        },
        response => {
          if (callback !== undefined) {
            callback(response);
          }
        }
      );
    }
  }

  static fetchLinechartDataForPermember(body, callback) {
    NetClient.netPost(
      global.tt_constant.net_url_projectbugschart,
      {
        uid: body.userid,
        project_id: body.projectid,
        debugger_ids: [body.debugerids]
      },
      response => {
        if (callback !== undefined) {
          callback({
            code: response.msg.code,
            data: response.chart
          });
        }
      }
    );
  }
}
