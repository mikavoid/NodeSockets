const moment = require('moment')
const now = moment()

class Message {
    constructor(message, name) {
        this.eventName = process.env.MESSAGE_EVT || 'message'
        this.text = message || ''
        this.date = now.valueOf()
        this.name = name || 'Administrator'
    }

    send(socket) {
        socket.emit(this.eventName, this)
    }
}

module.exports = Message