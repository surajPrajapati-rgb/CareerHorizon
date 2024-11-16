import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import styles from './ChatBox.module.css';

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  console.log('ChatBox component mounted with user:', user);
  console.log('Message:', messages);

  useEffect(() => {
    
    socketRef.current = new WebSocket('ws://localhost:8000/ws/chat/room1/');

    socketRef.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const handleSendMessage = (message) => {
    if (message.trim() && socketRef.current.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({ sender: user?.email, message });
      console.log('Sending message:', data);
      socketRef.current.send(data);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBox;
