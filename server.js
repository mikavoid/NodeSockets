const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

http.listen(PORT, () => {
    console.log('Server listening on ', PORT)
})