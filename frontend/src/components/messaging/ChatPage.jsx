import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ChatBox from './ChatBox';
import axios from 'axios';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const { user } = useContext(UserContext); 
  const [chatUsers, setChatUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const fetchChatUsers = async () => {
      if (!user?.email) {
        return;
      }

      try {
        const response = await axios.get('https://careerhorizon-vfpx.onrender.com/messaging/chat_users/', {
          params: {
            sender: user.email, // Fetch chat users for the current user
          },
        });
        setChatUsers(response.data);
        if (!selectedUser && response.data.length > 0) {
          setSelectedUser(response.data[0].username); // Default to the first user
        }
      } catch (err) {
        console.error('Error fetching chat users:', err);
      }
    };

    fetchChatUsers();
  }, [user]);

  // Handler to switch selected recipient
  const handleUserSelection = (username) => {
    setSelectedUser(username);
  };

  return (
    <div className={styles.chatPageContainer}>
      {/* Sidebar for user selection */}
      <div className={styles.userList}>
        <h2>Chats</h2>
        <ul>
          {chatUsers.map((chatUser) => (
            <li
              key={chatUser.id}
              className={selectedUser === chatUser.username ? styles.activeUser : ''}
              onClick={() => handleUserSelection(chatUser.username)}
            >
              {chatUser.username}
            </li>
          ))}
        </ul>
      </div>

      {/* ChatBox for selected user */}
      <div className={styles.chatContent}>
        {selectedUser ? (
          <>
            <ChatBox otherUser={selectedUser} />
          </>
        ) : (
          <p>Please select a user to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
