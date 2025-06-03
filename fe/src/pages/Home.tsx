import Layout from '../components/Layout';
import Map from '../components/Map';
import { useTranslation } from 'react-i18next';

const Home = () => {

  const { t } = useTranslation();

  return (
    <Layout>
      <h1>{t('home.title')}</h1>
      <p>{t('home.welcomeMessage')}</p>
      <Map />
    </Layout>
  );
};

export default Home;