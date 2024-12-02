import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ChatBox from './ChatBox';
import axios from 'axios';
import styles from './ChatPage.module.css';
import  { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { user } = useContext(UserContext); 
  const [chatUsers, setChatUsers] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const navigate = useNavigate();

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
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className={styles.chatPageContainer}>
      {/* Sidebar for user selection */}
      <div className={styles.userList}>
      <div 
  style={{
    display: 'flex', 
    gap: '10px', 
    margin: '10px', 
    alignItems: 'center',  // Ensures that items are aligned vertically in the center
  }}
>
  <span>
    <button 
      onClick={handleBackClick} 
      style={{
        padding: '5px 10px',  // Added some padding to make the button look better
        fontSize: '16px', 
        backgroundColor: 'black', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer', 
        transition: 'background-color 0.3s ease',
      }}
    >
      Back
    </button>
  </span>
  
  <h2 
    style={{
      fontSize: '20px', 
      fontWeight: 'bold', 
      color: 'black', 
      textAlign: 'center', 
      margin: '0',  // Removed margin to make it align properly with the button
      fontFamily: 'Arial, sans-serif',
      flex: 1, // Takes up remaining space and pushes the content to the center
    }}
  >
    Chat
  </h2>
</div>

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
