const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', () => {
    console.log('user connected via socket.io')
})

http.listen(PORT, () => {
    console.log('Server listening on ', PORT)
})