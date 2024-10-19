const express = require('express')
const bodyParser = require('body-parser')
const { Server, Socket } = require('socket.io')

const io = new Server({
    cors: true
})
const app = express()

app.use(bodyParser.json())

const emailToSocketMapping = new Map()

io.on('connection', socket => {
    console.log('New Connection')
    socket.on('join-room', data => {
        const { roomId, emailId } = data
        console.log("User", emailId, "JoinedRoom", roomId)
        emailToSocketMapping.set(emailId, socket.id)
        socket.join(roomId)
        socket.emit('joined-room', { roomId })
        socket.broadcast.to(roomId).emit("user-joined", { emailId })
    })
})

app.listen(8000, () => console.log('http://localhost:8000'))
io.listen(5000)