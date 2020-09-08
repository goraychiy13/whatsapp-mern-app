import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from "./axios";

export interface MessagesData {
  message: string,
  name: string,
  timestamp: string,
  received: boolean
}

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then((response: any) => {
        setMessages(response.data);
      });
  }, [])

  useEffect(() => {
    const pusher = new Pusher('b1f1609426f7472e0bc6', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage: never) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])

  console.log(messages);


  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
