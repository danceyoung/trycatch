/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-22 16:25:19 
 * @Last Modified by: Young
 * @Last Modified time: 2019-06-05 13:02:52
 */
export default class Utils {
  static checkEmailValid(emailAddress) {
    var regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return regex.test(emailAddress)
  }

  static getUID() {
    return sessionStorage.getItem(global.tt_constant.UID);
  }
}