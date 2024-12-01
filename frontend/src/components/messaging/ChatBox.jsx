import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import styles from './ChatBox.module.css';

const ChatBox = ({ otherUser }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user?.email || !otherUser) return;

      try {
        const response = await axios.get(`https://careerhorizon-vfpx.onrender.com/messaging/chat/${otherUser}/`, {
          params: { sender: user.email }, // Pass the sender email as a query parameter
        });

        // Update the messages state with fetched data
        setMessages(
          response.data.map((msg) => ({
            id: msg.id,
            sender: msg.sender,
            content: msg.content,
            timestamp: msg.timestamp,
          }))
        );
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [otherUser, user]);

  // Establish WebSocket connection
  useEffect(() => {
    if (otherUser && user?.email) {
      // const roomName = `${user.email}_${otherUser}`.replace(/[^A-Za-z0-9._-]/g, "_");
      const roomName = [user.email, otherUser].sort().join("_").replace(/[^A-Za-z0-9._-]/g, "_");

      const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
  
      ws.onopen = () => {
        console.log("WebSocket connection established with room:", roomName);
      };
  
      ws.onmessage =  (event) => {
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
        console.error("WebSocket error:", error);
      };
  
      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
      };
  
      setSocket(ws);
  
      return () => {
        ws.close();
      };
    }
  }, [otherUser, user]);

  const handleSendMessage = async () =>  {
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      sender: user.email, 
      recipient: otherUser, 
      message: newMessage.trim(),
    };

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageData));
  } else {
      console.error("WebSocket is not open.");
  }

  try {
    await axios.post('https://careerhorizon-vfpx.onrender.com/messaging/create/', {
      recipient: otherUser,
      content: newMessage.trim(),
      sender: user.email,
    });
    console.log("Message saved successfully in sender's inbox.");
  } catch (error) {
    console.error("Failed to save message:", error.response?.data || error.message);
  }

  try {
    await axios.post('https://careerhorizon-vfpx.onrender.com/messaging/create/', {
      recipient: user.email,
      content: newMessage.trim(),
      sender: otherUser,
    });
    console.log("Message saved successfully in recipient's inbox.");
  } catch (error) {
    console.error("Failed to save message:", error.response?.data || error.message);
  }
  
  // setMessages((prev) => [
  //     ...prev,
  //     { sender: user.email, content: newMessage.trim(), timestamp: new Date().toISOString() },
  //   ]);
  //   setNewMessage('');

  };

  return (
    <div>
      <h1>Chat with {otherUser}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.sender}: {msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;

// Original Code

// useEffect(() => {
//   if (otherUser && user?.email) {
  
//     const roomName = `${user.email}_${otherUser}`.replace(/[^A-Za-z0-9._-]/g, "_");

//     const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: data.sender,
//           content: data.message,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     };
    
//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }
// }, [otherUser, user]);





































// import React, { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../../context/UserContext';
// import styles from './ChatBox.module.css';
// import axios from 'axios';

// const ChatBox = ({ otherUser }) => {
//   const { user } = useContext(UserContext);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   useEffect(() => {
//     console.log("User:", user);
  
//     if (otherUser && user?.email) {
//       const fetchMessages = async () => {
//         try {
//           const response = await axios.get(`http://localhost:8000/messaging/chat/${otherUser}/`, {
//             params: { sender: user.email },
//           });
  
//           console.log("Response Chat History:", response.data);
  
//           // Set the messages state with the fetched data
//           setMessages(response.data);
//         } catch (error) {
//           console.error('Failed to fetch chat history:', error);
//         }
//       };
  
//       fetchMessages();
//     }
//   }, [otherUser, user]);
  

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     // Prepare message payload
//     const messageData = {
//       sender: user.email, 
//       recipient: otherUser, 
//       content: newMessage.trim(),
//     };
//     console.log('Sending message:', messageData);
//     try {
//       // Save the new message via the API
//       const response = await fetch('http://localhost:8000/messaging/create/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(messageData),
//       });

//       if (!response.ok) {
//         throw new Error(`Error sending message: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Message saved successfully:', data);

//       // Update local state with the new message
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: user.email,
//           recipient: otherUser,
//           content: newMessage.trim(),
//           timestamp: new Date().toISOString(), 
//         },
//       ]);

//       setNewMessage('');
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   };

//   return (
//     <div className={styles.chatContainer}>
//       <h1>Chat with {otherUser}</h1>

//       {/* Message List */}
//       <div className={styles.messageList}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={
//               msg.sender === user.email ? styles.sentMessage : styles.receivedMessage
//             }
//           >
//             <p className={styles.messageContent}>{msg.content}</p>
//             <span className={styles.messageTimestamp}>
//               {new Date(msg.timestamp).toLocaleString()}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* New Message Input */}
//       <div className={styles.messageInput}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;



// // import React, { useContext, useState, useEffect } from 'react';
// // import { UserContext } from '../../context/UserContext';
// // import styles from './ChatBox.module.css';

// // const ChatBox = ({ otherUser }) => {
// //   const { user } = useContext(UserContext);
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [socket, setSocket] = useState(null);

// //   useEffect(() => {
// //     if (otherUser && user?.username) {
// //       const roomName = `${user.username}_${otherUser}`;
// //       const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

// //       ws.onmessage = (event) => {
// //         const data = JSON.parse(event.data);
// //         setMessages((prev) => [
// //           ...prev,
// //           {
// //             sender: data.sender,
// //             content: data.message,
// //             timestamp: new Date().toISOString(),
// //           },
// //         ]);
// //       };

// //       setSocket(ws);

// //       return () => {
// //         ws.close();
// //       };
// //     }
// //   }, [otherUser, user]);

// //   const handleSendMessage = () => {
// //     if (!newMessage.trim() || !socket) return;

// //     const messageData = {
// //       sender: user.username,
// //       message: newMessage.trim(),
// //     };
// //     console.log('Sending message:', messageData);
// //     socket.send(JSON.stringify(messageData));

// //     setMessages((prev) => [
// //       ...prev,
// //       { sender: user.username, content: newMessage.trim(), timestamp: new Date().toISOString() },
// //     ]);
// //     setNewMessage('');
// //   };

// //   return (
// //     <div className={styles.chatContainer}>
// //       <h1>Chat with {otherUser}</h1>

// //       {/* Message List */}
// //       <div className={styles.messageList}>
// //         {messages.map((msg, index) => (
// //           <div
// //             key={index}
// //             className={
// //               msg.sender === user.username ? styles.sentMessage : styles.receivedMessage
// //             }
// //           >
// //             <p className={styles.messageContent}>{msg.content}</p>
// //             <span className={styles.messageTimestamp}>
// //               {new Date(msg.timestamp).toLocaleString()}
// //             </span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* New Message Input */}
// //       <div className={styles.messageInput}>
// //         <input
// //           type="text"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           placeholder="Type a message..."
// //         />
// //         <button onClick={handleSendMessage}>Send</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBox;



// // import React, { useContext, useState, useEffect } from 'react';
// // import { UserContext } from '../../context/UserContext';
// // import styles from './ChatBox.module.css';
// // import axios from 'axios';

// // const ChatBox = ({ otherUser }) => {
// //   const { user } = useContext(UserContext);
// //   const [messages, setMessages] = useState([]);
// //   const [chatUsers, setChatUsers] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch messages for the chat
// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       if (!otherUser || !user?.token || !user?.email) {
// //         setError('Missing user or authentication details.');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const response = await axios.get(
// //           `http://localhost:8000/messaging/chat/${otherUser}/`,
// //           {
// //             params: {
// //               sender: user.email,
// //             },
// //           }
// //         );

// //         setMessages(response.data);
// //       } catch (err) {
// //         console.error('Error fetching messages:', err);
// //         setError(err.response?.data?.detail || 'Failed to load messages. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMessages();
// //   }, [otherUser, user]);

// //   useEffect(() => {
// //     const fetchChatUsers = async () => {
// //       if (!user?.token) {
// //         return;
// //       }

// //       try {
// //         const response = await axios.get('http://localhost:8000/messaging/chat_users/', {
// //           params: {
// //             sender: user.email,
// //           },
// //         });
// //         setChatUsers(response.data);
// //       } catch (err) {
// //         console.error('Error fetching chat users:', err);
// //       }
// //     };

// //     fetchChatUsers();
// //   }, [user]);

// //   // Send a new message
// //   const handleSendMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     try {
// //       const response = await axios.post(
// //         'http://localhost:8000/messaging/create/',
// //         {
// //           recipient: otherUser,
// //           content: newMessage,
// //           sender: user.email,   
// //         }
// //       );

// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           id: response.data.message_id, 
// //           sender: user.username,
// //           content: newMessage,
// //           timestamp: new Date().toISOString(),
// //         },
// //       ]);
// //       setNewMessage('');
// //     } catch (err) {
// //       console.error('Error sending message:', err);
// //       setError(err.response?.data?.detail || 'Failed to send message.');
// //     }
// //   };

// //   if (!user) {
// //     return <div>Loading user information...</div>;
// //   }

// //   if (loading) {
// //     return <div>Loading chat...</div>;
// //   }

// //   if (error) {
// //     return <div className={styles.error}>{error}</div>;
// //   }

// //   return (
// //     <div className={styles.chatContainer}>
// //       <h1>Chat with {otherUser}</h1>

// //       {/* Chat User List
// //       <div className={styles.chatUserList}>
// //         <h2>Your Chats</h2>
// //         <ul>
// //           {chatUsers.map((chatUser) => (
// //             <li key={chatUser.id} onClick={() => setOtherUser(chatUser.username)}>
// //               {chatUser.username}
// //             </li>
// //           ))}
// //         </ul>
// //       </div> */}

// //       {/* Message List */}
// //       <div className={styles.messageList}>
// //         {messages.map((msg) => (
// //           <div
// //             key={msg.id}
// //             className={
// //               msg.sender === user.username ? styles.sentMessage : styles.receivedMessage
// //             }
// //           >
// //             <p className={styles.messageContent}>{msg.content}</p>
// //             <span className={styles.messageTimestamp}>
// //               {new Date(msg.timestamp).toLocaleString()}
// //             </span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* New Message Input */}
// //       <div className={styles.messageInput}>
// //         <input
// //           type="text"
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           placeholder="Type a message..."
// //         />
// //         <button onClick={handleSendMessage}>Send</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBox;
