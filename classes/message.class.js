const moment = require('moment')
const now = moment()

class Message {
    constructor(message) {
        this.eventName = process.env.MESSAGE_EVT || 'message'
        this.text = message || ''
        this.date = now.valueOf()
    }

    send(socket) {
        socket.emit(this.eventName, this)
    }
}

module.exports = Message