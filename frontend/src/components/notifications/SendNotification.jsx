import React, { useEffect, useState } from 'react';
import styles from './SendNotification.module.css';

const SendNotification = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('https://careerhorizon-vfpx.onrender.com/accounts/current_user/');
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.is_admin); // Backend returns 'is_admin'.
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
  
    fetchUserRole();
  }, []);
  

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setResponseMessage('');
    setError(null);

    if (!isAdmin) {
      setError('You do not have permission to send notifications.');
      return;
    }

    try {
      const response = await fetch('https://careerhorizon-vfpx.onrender.com/api/v2/notifications/', {
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

  if (!isAdmin) {
    return <p className={styles.error}>You are not authorized to send notifications.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin: Send Notification</h1>
      <form onSubmit={handleSendNotification} className={styles.form}>
        {/* Form Elements */}
      </form>
    </div>
  );
};

export default SendNotification;
