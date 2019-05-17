> Written with [StackEdit](https://stackedit.io/).
# Trycatch
Real-time with no special SDKs monitoring, notifying and aggregating application exception for backend coders.

GitHub Page Website of TryCatch http://danceyoung.github.io/trycatchfinally/

![enter image description here](https://github.com/danceyoung/trycatch/blob/master/resource/cover.png?raw=true)

## Architecture
Trycatch consists of four parts:

 - [backend server](https://github.com/danceyoung/trycatch-server)
 Implemented by golang, providing APIs service and Push Notification service etc. .

 - [frontend web app](https://github.com/danceyoung/trycatch/tree/master/trycatch-webApp)
 Implemented by reactjs, providing intereactive user interface for administrator or normal user.
 - [mobile app](https://github.com/danceyoung/trycatch/tree/master/trycatch-mobileApp)
 Another way to browse activity and report by real-time through Push Notification Server, supporting iOS and Android mobile.

 - [diaper](https://github.com/danceyoung/trycatch/tree/master/trycatch-flumeDiaper)(custom flume HttpSink to monitor exception)
 Aggregating exception log data by [Taildir Source](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#taildir-source) of Apache Flume, and sending log data as a POST body to BackendServer by [HTTP Sink](http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#http-sink) of Apache Flume.

 
 ![architecture](https://github.com/danceyoung/trycatch/blob/master/resource/architecture.png?raw=true)
 ## Quick Start with a demo
 

 1. Sign in TryCatch
 2. Manage the demo project
 3. Download a demo java jar and run
 The jar will generating errors random and outputting to logfile.
 5. Download Apache Flume
 6. Configure Flume and start TryCatch agent

 
## License
Trycatch is [MIT licensed](https://github.com/danceyoung/trycatch/blob/master/LICENSE)
