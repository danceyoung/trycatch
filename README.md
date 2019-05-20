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
 

 1. **Prerequisite**
 > - 64bit OS, Linux/Unix/Mac
 > - 64bit JDK 1.8+
 > - Available network connect
2. **Download demo**

> Download [demo](https://pan.baidu.com/s/1GV4Dtu6wpmROX_PDfiWf8Q) 
> - `copy demo.tar.gz to a directory and tar -zxvf demo.tar.gz`
> - run `java -jar ./generror-1.0-SNAPSHOT-jar-with-dependencies.jar`
> - `cd apache-flume-1.8.0-bin/bin`, then run  `./diaper.h`

3. **Sign in TryCatch**

>  - Open http://danceyoung.github.io/trycatchfinally/  or iOS app [TryCatch], sign in with a account that username is `danceyoung@hotmail.com`, password is
   `diaper`
> - Click the project "TryCatch Project Test", then browse the bug list and charts
## Developing custom components
 - diaper-flume-conf.properties
> 
> A config file that watch the specified files, and tail them in nearly real-time once detected new lines appended to the each files. Please link Apache Flume official doc http://flume.apache.org/releases/content/1.9.0/FlumeUserGuide.html#taildir-source
> You may care about `agent.sources.loggerSource.filegroups` to config the logfiles wathed.

 - Manage the demo project

> ![access token](https://github.com/danceyoung/trycatch/blob/master/resource/accesstokendemo.png?raw=true)
Copy content in the 3 step, then you need to write the value to your application. 
- Your backend application
> Assuming the jar of demo is your backend application, you have to do is adding a json string to your log content, the json string contains `ttf_access_token` and `ttf_log_timestamp` properties.   
> `ttf_access_token` is the value copied in the part of "Manage the demo project",  
> `ttf_log_timestamp` is the number of milliseconds of now date. 
> The source code is in [demo source code](https://github.com/danceyoung/trycatch/blob/master/demo/src/main/java/com/trycatch/GenError.java) 
 
## License
Trycatch is [MIT licensed](https://github.com/danceyoung/trycatch/blob/master/LICENSE)
