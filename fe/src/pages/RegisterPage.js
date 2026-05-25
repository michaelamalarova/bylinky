import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, { email, password });
      window.location.href = '/login';
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <h2>{t('registration.title')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>{t('label.email')}:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>{t('label.password')}:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{t('registration.register')}</button>
      </form>
    </Layout>
  );
};

export default RegisterPage;
