const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)
const moment = require('moment')

const Message = require('./classes/message.class')

const clientInfo = {}


app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    const date = moment().utc(moment().format('x'))
    console.log('user connected via socket.io')

    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req
        const message = new Message(req.name + ' has joined!')
        socket.join(req.room)
        socket.broadcast.to(req.room).emit('message', message)
    })

    socket.on('message', (message) => {
        console.log('Message recieved: ', message.text)
        console.log('emit to ', clientInfo[socket.id].room )
        io.to(clientInfo[socket.id].room).emit('message', message)
    })

    const welcome = new Message('Welcome to the Chat Application')
    welcome.send(socket)
})

http.listen(PORT, () => {
    console.log('Server listening on ', PORT)
})