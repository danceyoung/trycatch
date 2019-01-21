/*
 * @Author: Young
 * DSHARP
 * @flow 
 * @Date: 2018-06-21 10:23:52 
 * @Last Modified by: Young
 * @Last Modified time: 2018-12-17 08:29:12
 */
global.tt_constant = {
  net_url: "http://127.0.0.1:8000/", //"http://65.52.178.219:8000/",
  net_url_signin: "user/signin",
  net_url_profile: "user/profile",
  net_url_changepassword: "user/changepassword",

  net_url_projects: "project/list",
  net_url_newproject: "project/new",
  net_url_receivefromlist: "project/receivefromlist",
  net_url_projectdetail: "project/detail",
  net_url_projectsave: "project/save",
  net_url_projectdelete: "project/delete",
  net_url_projectbugs: "project/bugs",

  msg_no_more_code: 12,

  theme_headerbg: "#212529",
  theme_blue: "#3B67BC",
  theme_yellow: "#FFD35B",
  theme_selected_color: "#F5F7F9",
  theme_debuger_noneselect_color: "#EFF7FF",
  color_bugcontent_fontcolor: "#4E555E",

  bug_bgyellow_fontcolor: "#2B2A27",

  home_account_pw_nomatch: "The email and password are not matching.",
  home_account_invalidemail: "The email is invalid.",
  home_password_length_noenough:
    "The password length is required at least 6 characters.",

  project_new_memberemail_invalid: "The member's email is invalid",
  project_new_memberemail_existed:
    "The memeber's email has already existed in the follow member list.",
  project_new_memberalias_required: "The member's alias name is required",
  project_new_receivefrom_alert:
    " will receive information debuged by the follow selected members, besides himself(herself).",
  project_new_tokens:
    "This token is used to integrate into his(her) application",

  member_delete_label: "delete",
  member_notify_label: "notify",

  main_no_more_bugs: "Here is no more bugs.",
  main_no_bugs: "No bugs is impossible."
};
