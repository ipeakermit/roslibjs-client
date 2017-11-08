Roslibjs Client 🤖
====

This is a wrapper around the roslibjs package aiming to improve shortcomings of the original roslib package by introducing a fluent API as well as some useful error and fault handling mechanisms.

For the official roslibjs repository please head to [https://github.com/RobotWebTools/roslibjs](https://github.com/RobotWebTools/roslibjs)

Inspired by https://github.com/milvusrobotics/roslibjs-client

## Connect
[ROSLIB.Ros({...})](http://robotwebtools.org/jsdoc/roslibjs/current/Ros.html)

```js
const client = new RosClient({
    url: 'ws://192.168.0.11:9090' // default
})

client.on('connected', () => {...})
client.on('disconnected', () => {...})
```

## Topic

`opts` - [ROSLIB.Topic({...})](http://robotwebtools.org/jsdoc/roslibjs/current/Topic.html)

`payload` - [ROSLIB.Message({...})](http://robotwebtools.org/jsdoc/roslibjs/current/Message.html)

```js


const topic = client.createTopic(opts) // instantiating

topic.publish(payload)
topic.subscribe(() => {...})
    .dispose()
```

## Service

`opts` – [ROSLIB.Service({...})](http://robotwebtools.org/jsdoc/roslibjs/current/Service.html)

`payload` – [ROSLIB.ServiceRequest({...})](http://robotwebtools.org/jsdoc/roslibjs/current/ServiceRequest.html)

```js
client.callService(opts, payload)
```
