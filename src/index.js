var ROSLIB = require('roslib')
var EventEmitter = require('wolfy87-eventemitter')
var Connection = require('./Connection.js')
var Topic = require('./Topic.js')
var Service = require('./Service.js')

const defaultOptions = {
    url: 'ws://localhost:9090',
    reconnectInterval: 5000 // ms before attempting another reconnect
}

class Client extends EventEmitter {
    constructor(opts) {
        super(opts)

        let options = Object.assign(defaultOptions, opts)

        this.connection = new Connection(this, options)
    }

    createTopic(opts) {
        return new Topic(this, opts)
    }

    callService(opts, payload) {
        return new Service(this, opts, payload)
    }
}

module.exports = Client
