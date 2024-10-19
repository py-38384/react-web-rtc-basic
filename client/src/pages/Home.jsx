import React, { useState, useEffect } from "react";
import { useSocket } from '../providers/Socket'

const Homepage = () => {
    const { socket } = useSocket()
    
    const [email, setEmail] = useState()
    const [roomId, setRoomId] = useState()

    const handleRoomJoined = ({ roomId }) => {
        console.log('Room Joined', roomId)
    }

    useEffect(() => {
        socket.on('joined-room')
    }, [socket])

    const handleJoinRoom = () => {
        socket.emit("join-room", { emailId: email, roomId })
    }

    return (
        <div className="homepage-container">
            <div className="input-container">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Your Email Here" />
                <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} placeholder="Enter Room Code"/>
                <button onClick={handleJoinRoom}>Enter Room</button>
            </div>
        </div>
    )
}
export default Homepage