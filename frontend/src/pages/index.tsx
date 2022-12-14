import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import Greetings from '../components/Greetings/Greetings';
import Events from '../components/Events/Events';
import Feed from '../components/Feed/Feed';
import Visitors from '../components/Visitors/Visitors';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home = ({ eventsData }: { eventsData: any }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/frontend/public/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navbar}></div>
        <Greetings />
        <Events eventsData={eventsData} />
        <section style={{ display: 'flex' }}>
          <Feed />
          <Visitors />
        </section>
      </main>
    </div>
  );
};

export default withTranslation('common')(Home);

export async function getStaticProps({ locale }: { locale: any }) {
  const res = await fetch('http://localhost:3001/events');
  const eventsData = await res.json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      eventsData
    }
  };
}
