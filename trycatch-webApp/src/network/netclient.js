/*
 * @Author: Young
 * DSHARP
 * @flow
 * @Date: 2018-06-22 09:18:04
 * @Last Modified by: Young
 * @Last Modified time: 2019-05-31 11:51:57
 */
import "../constant";

export default class NetClient {
  static netPost(subUrl, jsonBody) {
    console.log(
      "net post " + subUrl + " request body " + JSON.stringify(jsonBody)
    );
    return new Promise(resolve => {
      fetch(global.tt_constant.net_url + subUrl, {
        body: JSON.stringify(jsonBody),
        method: "POST",
        mode: "cors",
        // credentials: "omit",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(
            "a network error occurs, status is " +
              response.status +
              ", status text is " +
              response.statusText
          );
        })
        .catch(error => {
          console.log("net post " + subUrl + " occurs error " + error);
          resolve({
            msg: { code: -1, content: "The server is striking self, TMD." }
          });
        })
        .then(resJson => {
          console.log(
            "net post " + subUrl + " result " + JSON.stringify(resJson)
          );
          resolve(resJson);
        });
    });
  }
}
