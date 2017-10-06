$(document).ready(function () {
    const socket = io()
    const name = getQueryVariable('name') || 'Anonymous'
    const room = getQueryVariable('room') || 'General'

    const DATE_FORMAT = 'hh:mm:ss'

    function addMessageToList(message) {
        const $messages = $('#messages')
        const momentTS =  moment.utc(message.date)

        const li = `<li>
        ${message.name} - (<em>${momentTS.local().format(DATE_FORMAT)}</em>): 
        <strong>${message.text}</strong>
        </li>`

        $messages.append(li)
    }

    function buildMessageFromText(text) {
        const timestamp = moment().format('x')
        const date = moment().valueOf()
        return {
            text,
            name,
            date
        }
    }

    socket.on('connect', function () {
        const $meta = $('#meta')
        const p = `<p>
        <em>${name}</em> has joined the room : <strong>${room}</strong>
        </p>`

        $meta.append(p)
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
