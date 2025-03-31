// src/Contact.js
import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const Contact = () => {

  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('contact.title')}</h1>
    </Layout>
  )
    
};

export default Contact;
