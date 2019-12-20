var ROSLIB = require('roslib')
var constants = require('./Constants.js')
var EVENT_CONNECTED = constants.EVENT_CONNECTED;
var EVENT_DISCONNECTED = constants.EVENT_DISCONNECTED;

class Connection {
    constructor(client, opts) {
        this._client = client
        this._opts = opts

        this.connected = false
        this.scheduled = false

        // bind
        this._connect = this._connect.bind(this)
        this._onConnection = this._onConnection.bind(this)
        this._onFail = this._onFail.bind(this)

        // launch
        return this._connect(opts)
    }

    _connect(opts) {
        this.scheduled = false

        const ros = this.ros = new ROSLIB.Ros(opts)

        ros.on('close', this._onFail)
        ros.on('error', this._onFail)
        ros.on('connection', this._onConnection)

        return ros
    }

    _onConnection() {
        if (this.connected) {
            return
        }

        this.connected = true
        this._client.emit(EVENT_CONNECTED, this.ros)
    }

    _onFail() {
        if (this.connected) {
            // Going from connected to disconnected, publish disconnected event
            this._client.emit(EVENT_DISCONNECTED);
        }

        this.connected = false

        if (!this.scheduled) {
            this.scheduled = true
            setTimeout(this._connect, this._opts.reconnectInterval)
        }
    }
}

module.exports = Connection
