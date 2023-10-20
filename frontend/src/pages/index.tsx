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
import { useState } from 'react';

const Home = ({ eventsData }: { eventsData: any }) => {
  const router = useRouter();
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const add = () => {
    setResult(num1 + num2);
  };
  const subtract = () => {
    setResult(num1 - num2);
  };
  const multiply = () => {
    setResult(num1 * num2);
  };
  const divide = () => {
    setResult(num1 / num2);
  };

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

        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/*<div className={styles.result} data-testid="result">*/}
          {/*  {result}*/}
          {/*</div>*/}
          {/*<input*/}
          {/*  type="number"*/}
          {/*  className={styles.input}*/}
          {/*  data-testid="num1"*/}
          {/*  value={num1}*/}
          {/*  onChange={e => setNum1(Number(e.target.value))}*/}
          {/*/>*/}
          {/*<input*/}
          {/*  type="number"*/}
          {/*  className={styles.input}*/}
          {/*  data-testid="num2"*/}
          {/*  value={num2}*/}
          {/*  onChange={e => setNum2(Number(e.target.value))}*/}
          {/*/>*/}
          {/*<button onClick={add} className={styles.button} data-testid="add">*/}
          {/*  Add*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={subtract}*/}
          {/*  className={styles.button}*/}
          {/*  data-testid="subtract"*/}
          {/*>*/}
          {/*  Subtract*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={multiply}*/}
          {/*  className={styles.button}*/}
          {/*  data-testid="multiply"*/}
          {/*>*/}
          {/*  Multiply*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={divide}*/}
          {/*  className={styles.button}*/}
          {/*  data-testid="divide"*/}
          {/*>*/}
          {/*  Divide*/}
          {/*</button>*/}
        </div>
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
