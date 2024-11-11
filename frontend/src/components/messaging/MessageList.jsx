import React from 'react';
import styles from './MessageList.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((msg, index) => (
        <div key={index} className={styles.message}>
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
