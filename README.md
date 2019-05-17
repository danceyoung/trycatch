> Written with [StackEdit](https://stackedit.io/).
# Trycatch
Real-time with no special SDKs monitoring, notifying and aggregating application exception for backend coders.

GitHub Page Website of TryCatch http://danceyoung.github.io/trycatchfinally/

![enter image description here](https://github.com/danceyoung/trycatch/blob/master/resource/cover.png?raw=true)

## Architecture
Trycatch consists of four parts:

 - [backend server](https://github.com/danceyoung/trycatch-server)
 - [frontend web app](https://github.com/danceyoung/trycatch/tree/master/trycatch-webApp)
 - [mobile app](https://github.com/danceyoung/trycatch/tree/master/trycatch-mobileApp)
 - [diaper](https://github.com/danceyoung/trycatch/tree/master/trycatch-flumeDiaper)(custom flume HttpSink to monitor exception)
 
 ![architecture](https://github.com/danceyoung/trycatch/blob/master/resource/architecture.png?raw=true)
 ### backend server
 Implemented by golang, providing APIs service and Push Notification service etc. .
 ### frontend web app
Implemented by reactjs, providing intereactive user interface for administrator or normal user.
 - register account
 - manage your projects, members information and access token for per-member etc. 
 - browse activity and charts report of projects relevant you
 - ...
 ### mobile app
 Another way to browse activity and report by real-time through Push Notification Server, supporting iOS and Android mobile.
 ### diaper
 Aggregating exception log data by [Taildir Source](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#taildir-source) of Apache Flume, and sending log data as a POST body to BackendServer by [HTTP Sink](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#http-sink) of Apache Flume.

## License
Trycatch is [MIT licensed](https://github.com/danceyoung/trycatch/blob/master/LICENSE)
