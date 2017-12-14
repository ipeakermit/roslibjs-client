import ROSLIB from 'roslib'
import {
    EVENT_CONNECTED,
    EVENT_DISCONNECTED } from './Constants.js'

class Topic {
    constructor(client, opts) {
        this._opts = Object.assign({ ros: client.connection }, opts)
        this._client = client
        this._handlers = []

        // bind
        this._onMessage = this._onMessage.bind(this)
        this._onConnect = this._onConnect.bind(this)
        this._onDisconnect = this._onDisconnect.bind(this)

        // launch
        return this._create(opts)
    }

    _create(opts) {

        const instance = this._instance = new ROSLIB.Topic(this._opts)
        const handlers = this._handlers
        const subscribe = this._subscribe.bind(this)

        this._client.on(EVENT_CONNECTED, this._onConnect)
        this._client.on(EVENT_DISCONNECTED, this._onDisconnect)

        return {
            subscribe(handler) {
                handlers.push(handler)
                subscribe()

                return {
                    dispose() {
                        let index = handlers.indexOf(handler)

                        instance.unsubscribe()

                        if (index !== -1) {
                            handlers.splice(index, 1)
                        }
                    }
                }
            },
            // TODO: add additional opts for ROSLIB.Message({...})
            publish(payload) {
                const message = new ROSLIB.Message(payload)

                instance.publish(message)
            }
        }
    }

    _subscribe() {
        if (!this._listen) {
            this._listen = true
            this._instance.subscribe(this._onMessage)
        }
    }

    _onMessage(msg) {
        this._handlers.map(h => h(msg))
    }

    _onConnect() {
        if (!this._listen && this._handlers.length) {
            this._subscribe()
        }
    }

    _onDisconnect() {
        if (this._listen) {
            this._listen = false
            this._instance.unsubscribe()
        }
    }
}

export default Topic
