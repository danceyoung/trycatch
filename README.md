# Trycatch
Real-time with no special SDKs monitoring, notifying and aggregating application exception for coders.
## Architecture
Trycatch consists of four parts:

 - [backend server](https://github.com/danceyoung/trycatch-server)
 - [frontend web app](https://github.com/danceyoung/trycatch-intereactiveUIs)
 - mobile app
 - [diaper](https://github.com/danceyoung/trycatch-flumediaper)(custom flume HttpSink to monitor exception)
 
 ![architecture](https://github.com/danceyoung/trycatch/blob/master/resource/architecture.png?raw=true)
 ### backend server
 Implemented by golang, providing APIs for the other parts, and reading/writing datas from/into mysql database.
 ### frontend web app
Implemented by reactjs, a system platform provides intereactive user interface for administrator or normal user.
 - register account
 - manage your project. Add, edit and delete project/project member and so on
 - browse your or user allowed to browse for yourself activity and report
 - ...
 ### mobile app
 Another way to browse activity and report by real-time through Push Notification Server, supporting iOS and Android mobile.
 ### diaper
 A flume sink customed Flume HttpSink
