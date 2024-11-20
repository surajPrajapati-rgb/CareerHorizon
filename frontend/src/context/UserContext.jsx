import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserFromLocalStorage = () => {
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName'); 
    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');

    // const storedUser = JSON.parse(localStorage.getItem('user')); 

    if (email) {
      const userData = {
        email,
        name,
        role,
        token,
      };
      console.log("User data loaded from localStorage:", userData);
      setUser(userData);
    } else {
      setUser(null);
      console.error("No user data found in localStorage");
    }
    
  };

  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  const login = (userData) => {
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};