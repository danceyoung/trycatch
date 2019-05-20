> Written with [StackEdit](https://stackedit.io/).
# Trycatch
Real-time with no special SDKs monitoring, notifying and aggregating application exception for backend coders.

GitHub Page Website of TryCatch http://danceyoung.github.io/trycatchfinally/

![enter image description here](https://github.com/danceyoung/trycatch/blob/master/resource/cover.png?raw=true)
## Features

 - No SDKs embed
> You're still under the current coding model, no need to be embed any SDK, you can collect what to be collected.
 - Real-time
> Using Apache Flume Source watches the specified files, and tails them in nearly real-time once detected new lines appended to the each files. Customing Flume's HTTP Sink, send those content what you marked to server.
 - Push Notifications
> You can download, install and login APP iOS, upon receipt of information related you will be immediately sent to your smart phone.
 - Analyzes and aggregates
 > TryCatch App and Web site all will real-time show the information summary or detail through different charts.
 
 - Finally solve
> Errors are found in your applications, finally you will solve these errors. If you can't solve, you can open them to seek helps, for example opening to StackOverFlow.

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
> Open http://danceyoung.github.io/trycatchfinally/ and sign in with a account that username is `danceyoung@hotmail.com`, password is `diaper`

 2. Manage the demo project
> ![access token](https://github.com/danceyoung/trycatch/blob/master/resource/accesstokendemo.png?raw=true)
Copy content in the 3 step, then you need to write the value to your application. Continue the below 4.
 3. Download a demo java jar and run `java -jar xxx`
 The jar will generating errors random and outputting to logfile.
 Assuming this is your backend application, and output the exceptions to logfiles. Now you have to do is adding a json string to your log contentt, the json string contains `ttf_access_token` and `ttf_log_timestamp` properties. 
 `ttf_access_token` is the value copied in the prior step,
 `ttf_log_timestamp` is the number of milliseconds of now date.
 The source code is in [demo source code](https://github.com/danceyoung/trycatch/tree/master/demo) and demo java jar package [demo java jar ](https://github.com/danceyoung/trycatch/blob/master/demo/generror-1.0-SNAPSHOT-jar-with-dependencies.jar)
 
 4. Download Apache Flume
 [Apache Flume](http://www.apache.org/dyn/closer.lua/flume/1.9.0/apache-flume-1.9.0-bin.tar.gz)  and unzip a directory.
 
 6. Configure Flume and start TryCatch agent

 
## License
Trycatch is [MIT licensed](https://github.com/danceyoung/trycatch/blob/master/LICENSE)
