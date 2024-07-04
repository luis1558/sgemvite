import React from 'react';
import styles from '../styles/Login.module.css'; // Importa los estilos como un objeto

export const Login = () => {
  return (
    <div className={styles.container}> {/* Usa la clase generada por CSS Modules */}
      <div className={styles.wrapper}>
        <form method="POST">
            <h1>Login</h1>
            <p>SGEM</p>
            <div className={styles.inputbox}>
                <input type="text" placeholder="Username" name="username" required />
                <i className='bx bxs-user'></i>
            </div>
            <div className={styles.inputbox}>
                <input type="password" placeholder="Password" name="password" required />
                <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className={styles.btn}>Login</button>
        </form>
      </div>
    </div>
  );
};
