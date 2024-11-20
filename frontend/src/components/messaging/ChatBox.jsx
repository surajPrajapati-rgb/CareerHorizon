import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './ChatBox.module.css';
import axios from 'axios';

const ChatBox = ({ otherUser }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch messages for the chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!otherUser || !user?.token || !user?.email) {
        setError('Missing user or authentication details.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:8000/messaging/chat/${otherUser}/`,
          {
            params: {
              sender: user.email,
            },
          }
        );

        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError(err.response?.data?.detail || 'Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [otherUser, user]);

  // Fetch chat users
  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!user?.token) {
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/messaging/chat_users/', {
          params: {
            sender: user.email,
          },
        });
        setChatUsers(response.data);
      } catch (err) {
        console.error('Error fetching chat users:', err);
      }
    };

    fetchChatUsers();
  }, [user]);

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:8000/messaging/create/',
        {
          recipient: otherUser,
          content: newMessage,
          sender: user.email,   
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          id: response.data.message_id, 
          sender: user.username,
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.response?.data?.detail || 'Failed to send message.');
    }
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  if (loading) {
    return <div>Loading chat...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.chatContainer}>
      <h1>Chat with {otherUser}</h1>

      {/* Chat User List */}
      <div className={styles.chatUserList}>
        <h2>Your Chats</h2>
        <ul>
          {chatUsers.map((chatUser) => (
            <li key={chatUser.id} onClick={() => setOtherUser(chatUser.username)}>
              {chatUser.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Message List */}
      <div className={styles.messageList}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === user.username ? styles.sentMessage : styles.receivedMessage
            }
          >
            <p className={styles.messageContent}>{msg.content}</p>
            <span className={styles.messageTimestamp}>
              {new Date(msg.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* New Message Input */}
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
  );
};

export default ChatBox;
