import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const About = () => {

  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('about.title')}</h1>
      <p>{t('about.description')}</p>
    </Layout>
  );
};

export default About;
