$(document).ready(function () {
    const socket = io()

    function addMessageToList(message) {
        const $messages = $('#messages')

        const li = `<li>
        <em>${message.date}</em>: 
        <strong>${message.text}</strong>
        </li>`

        $messages.append(li)
    }

    function buildMessageFromText(text) {
        const timestamp = moment().format('x')
        const date = moment().utc(timestamp)
        return {
            text,
            date: date.local().format('HH:mm')
        }
    }

    socket.on('connect', function () {
        console.log('Connected to socket io')
    })

    socket.on('message', function (message) {
       addMessageToList(message)
    })

    $('#message-form').on('submit', function (e) {
        e.preventDefault()
        const $message = $(this).find('#message')
        const message = buildMessageFromText($message.val())
        socket.emit('message', message)
        addMessageToList(message)
        $message.val('')
    })
})
