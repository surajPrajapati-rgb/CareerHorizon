import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { UserContext } from '../../context/UserContext';
import styles from './SendNotification.module.css';

const SendNotification = () => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
            `https://careerhorizon-vfpx.onrender.com/accounts/current_user/`,
            { params: { sender: user.email } }
        );

        console.log('User details:', response.data);

        // Update isAdmin state based on fetched data
        setIsAdmin(response.data.is_admin);
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data || error.message);
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]); // Dependency ensures it runs when `user` changes

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setError(null);

    if (!isAdmin) {
      setError('You do not have permission to send notifications.');
      return;
    }

    try {
      const response = await fetch('https://careerhorizon-vfpx.onrender.com/api/v1/notifications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Notification sent! ID: ${data.id}`);
        setTitle('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setError(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (!isAdmin) {
    return <p className={styles.error}>You are not authorized to send notifications.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin: Send Notification</h1>
      <form onSubmit={handleSendNotification} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Send Notification</button>
      </form>
      {responseMessage && <p className={styles.success}>{responseMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SendNotification;
