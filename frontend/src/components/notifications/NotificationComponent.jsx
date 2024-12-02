import React, { useEffect, useState } from 'react';
import styles from './NotificationComponent.module.css';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:8000/ws/notifications/');

    const playSound = () => {
      const audio = new Audio('/public/mixkit-sci-fi-confirmation-914.wav');
      audio.play();
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      playSound();
    };

    // Clean up the WebSocket connection on component unmount
    return () => socket.close();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Notifications</h2>
      {notifications.length === 0 ? (
        <p className={styles.emptyMessage}>No notifications yet</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((notification, index) => (
            <li key={index} className={styles.listItem}>
              <span className={styles.title}>{notification.title}</span>
              <p className={styles.message}>{notification.message}</p>
              <small className={styles.timestamp}>
                {new Date(notification.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationComponent;
