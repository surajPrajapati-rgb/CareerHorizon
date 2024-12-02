import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import styles from './ChatBox.module.css';

const ChatBox = ({ otherUser }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null); // Ref for the end of the messages

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user?.email || !otherUser) return;

      try {
        const response = await axios.get(
          `https://careerhorizon-vfpx.onrender.com/messaging/chat/${otherUser}/`,
          {
            params: { sender: user.email },
          }
        );

        setMessages(
          response.data.map((msg) => ({
            id: msg.id,
            sender: msg.sender,
            content: msg.content,
            timestamp: msg.timestamp,
          }))
        );
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [otherUser, user]);

  useEffect(() => {
    if (otherUser && user?.email) {
      const roomName = [user.email, otherUser].sort().join('_').replace(/[^A-Za-z0-9._-]/g, '_');

      const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

      ws.onopen = () => {
        console.log('WebSocket connection established with room:', roomName);
      };

      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);

        setMessages((prev) => [
          ...prev,
          {
            sender: messageData.sender,
            content: messageData.message,
            timestamp: new Date().toISOString(),
          },
        ]);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [otherUser, user]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Dependency on messages array

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      sender: user.email,
      recipient: otherUser,
      message: newMessage.trim(),
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageData));
    } else {
      console.error('WebSocket is not open.');
    }

    try {
      await axios.post('https://careerhorizon-vfpx.onrender.com/messaging/create/', {
        recipient: otherUser,
        content: newMessage.trim(),
        sender: user.email,
      });

      // Add the new message to the messages state immediately after sending
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: user.email,
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
        },
      ]);

      console.log('Message saved successfully in sender\'s inbox.');
    } catch (error) {
      console.error('Failed to save message:', error.response?.data || error.message);
    }

    setNewMessage(''); // Clear the input after sending
  };

  return (
    <div>
      <div className="chatWith"><h1>Chat with {otherUser}</h1></div>
      <div>
        <div className={styles.messageList}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === user.email ? styles.sentMessage : styles.receivedMessage}
            >
              <p className={styles.messageContent}>{msg.content}</p>
              <span className={styles.messageTimestamp}>
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
          {/* This is the ref element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.messageInput}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
