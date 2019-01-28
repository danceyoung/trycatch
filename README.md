> Written with [StackEdit](https://stackedit.io/).
# Trycatch
Real-time with no special SDKs monitoring, notifying and aggregating application exception for coders.
## Demo
[enter link description here](https://github.com/danceyoung/trycatch/blob/master/resource/demo.mp4?raw=true)
## Architecture
Trycatch consists of four parts:

 - [backend server](https://github.com/danceyoung/trycatch-server)
 - [frontend web app](https://github.com/danceyoung/trycatch/tree/master/trycatch-webApp)
 - [mobile app](https://github.com/danceyoung/trycatch/tree/master/trycatch-mobileApp)
 - [diaper](https://github.com/danceyoung/trycatch/tree/master/trycatch-flumeDiaper)(custom flume HttpSink to monitor exception)
 
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
 Aggregating exception log data by [Taildir Source](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#taildir-source) of Apache Flume, and sending log data as a POST body to BackendServer by [HTTP Sink](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#http-sink) of Apache Flume.
