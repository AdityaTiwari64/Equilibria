import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    navigate('/'); // Navigate to dashboard after login
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className={`${styles.inputGroup} ${focusedInput === 'username' ? 'scale-105' : ''}`}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput(null)}
            required
            className="peer"
          />
          <span className={`${styles.icon} peer-focus:scale-110`}>👤</span>
        </div>
        <div 
          className={`${styles.inputGroup} ${focusedInput === 'password' ? 'scale-105' : ''}`}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            required
            className="peer"
          />
          <span className={`${styles.icon} peer-focus:scale-110`}>🔒</span>
        </div>
        <div className="text-right">
          <a 
            href="#" 
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <button 
          type="submit" 
          className={`${styles.submitButton} group`}
        >
          <span className="inline-block transform group-hover:scale-105 transition-transform duration-200">
            Login
          </span>
        </button>
      </form>
      <div className={styles.socialLogin}>
        <p className="text-gray-500">or login with social platforms</p>
        <div className={styles.socialButtons}>
          {[
            { icon: <FaGoogle />, color: 'hover:text-red-500' },
            { icon: <FaFacebook />, color: 'hover:text-blue-600' },
            { icon: <FaGithub />, color: 'hover:text-gray-800' },
            { icon: <FaLinkedin />, color: 'hover:text-blue-700' }
          ].map((social, index) => (
            <button 
              key={index}
              className={`${styles.socialButton} ${social.color}`}
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login; 