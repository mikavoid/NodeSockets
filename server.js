const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)
const moment = require('moment')

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    const date = moment().utc(moment().format('x'))
    console.log('user connected via socket.io')

    socket.on('message', (message) => {
        console.log('Message recieved: ', message.text)
        socket.broadcast.emit('message', message)
    })

    socket.emit('message', {
        text: 'Welcome to the Chat Application',
        date: date.local().format('HH:mm')
    })
})

http.listen(PORT, () => {
    console.log('Server listening on ', PORT)
})