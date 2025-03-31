// EditProfile.js (pro úpravu profilu)
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', bio: '' });
    const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/users/profile');
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('/api/users/profile', user);
  };

  return (
    <Layout>
      <h1>{t('editProfile.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('label.name')}</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div>
          <label>{t('label.email')}</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <button type="submit">{t('editProfile.saveChanges')}</button>
      </form>
    </Layout>

  );
};

export default EditProfile;
