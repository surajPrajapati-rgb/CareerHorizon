import React from 'react';
import styles from './MessageList.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <div key={index} className={styles.message}>
          <div className={styles.messageHeader}>
            <strong>{msg.sender}</strong> <span>{msg.timestamp}</span>
          </div>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
