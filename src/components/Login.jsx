import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    try {
      const response = await fetch('https://sgemvite-back-turso-sql.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, handle success
        console.log('Login successful:', data);
        // Redirect to home page
        navigate('/');
      } else {
        // Login failed, handle error
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>SGEM</p>
          <div className={styles.inputbox}>
            <input 
              type="text" 
              placeholder="Username" 
              name="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className={styles.inputbox}>
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}>Login</button>
        </form>
      </div>
    </div>
  );
};
