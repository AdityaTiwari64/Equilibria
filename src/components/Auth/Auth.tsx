import React, { useState, useCallback } from 'react';
import Login from './Login';
import Register from './Register';
import styles from './Auth.module.css';

const Auth: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleViewSwitch = useCallback((toLogin: boolean) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLoginView(toLogin);
    setTimeout(() => setIsAnimating(false), 500); // Match animation duration
  }, [isAnimating]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authContent}>
          {isLoginView ? (
            <>
              <div className={styles.leftPanel}>
                <h1>Hello, Welcome!</h1>
                <p className="text-lg mb-6 text-blue-100">Don't have an account?</p>
                <button 
                  className={styles.switchButton}
                  onClick={() => handleViewSwitch(false)}
                  disabled={isAnimating}
                >
                  Register
                </button>
              </div>
              <div className={`${styles.formContainer} ${isAnimating ? styles.slideLeft : ''}`}>
                <Login />
              </div>
            </>
          ) : (
            <>
              <div className={`${styles.formContainer} ${isAnimating ? styles.slideRight : ''}`}>
                <Register />
              </div>
              <div className={styles.rightPanel}>
                <h1>Welcome Back!</h1>
                <p className="text-lg mb-6 text-blue-100">Already have an account?</p>
                <button 
                  className={styles.switchButton}
                  onClick={() => handleViewSwitch(true)}
                  disabled={isAnimating}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth; 