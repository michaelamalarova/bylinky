import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Layout>
        <div className="login-form">
            <h2>{t('logIn.title')}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-row">
                    <label>{t('label.email')}:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-row">
                    <label>{t('label.password')}:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{t('label.logIn')}</button>
            </form>
        </div>
    </Layout>
    
  );
};

export default LoginPage;
