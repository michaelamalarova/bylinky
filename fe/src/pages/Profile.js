// Profile.js (pro zobrazení profilu)
//import React from 'react';
import React from 'react';
//import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
//import axios from 'axios';

const Profile = () => {
  console.log("Profile page rendered");

  //const [user, setUser] = useState({});
  const { t } = useTranslation();

 /*
    useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get('/api/users/profile');
      setUser(res.data);
    };
    fetchProfile();
  }, []);
  */

  return (
    
    <Layout>
      <h1>{t('profile.title')}</h1>
    </Layout>
  );
};

 /*
    <p>{t('label.name')}: {user.name}</p>
      <p>{t('label.email')}: {user.email}</p>  
  */

export default Profile;
