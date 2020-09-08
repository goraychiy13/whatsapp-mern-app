import React, { FunctionComponent, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "./axios"

interface ChatProps {
    messages: any
}

const Chat: FunctionComponent<ChatProps> = ({ messages }) => {
    const [input, setInput] = useState("")

    const sendMessage = async (e: any) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Demo App",
            timestamp: 'Just now',
            received: false
        })

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>
                        Room name
                    </h3>
                    <p>
                        Last seen at...
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message: any) => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                    <MicIcon />
                </form>
            </div>
        </div>
    )
}
export default Chat
