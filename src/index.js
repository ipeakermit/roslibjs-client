import ROSLIB from 'roslib'
import EventEmitter from 'wolfy87-eventemitter'
import Connection from './Connection.js'
import Topic from './Topic.js'
import Service from './Service.js'

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

export default Client
