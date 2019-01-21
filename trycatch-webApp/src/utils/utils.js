/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-22 16:25:19 
 * @Last Modified by: Young
 * @Last Modified time: 2018-06-22 16:25:39
 */
export default class Utils {
  static checkEmailValid(emailAddress) {
    var regex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return regex.test(emailAddress)
  }
}