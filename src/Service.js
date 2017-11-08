import ROSLIB from 'roslib'

class Service {
    constructor(client, opts, payload) {
        const options = Object.assign({ ros: client.connection }, opts)
        const instance = this._instance = new ROSLIB.Service(options)
        const request = new ROSLIB.ServiceRequest(payload)

        return new Promise(resolve => instance.callService(request, resolve))
    }
}

export default Service
