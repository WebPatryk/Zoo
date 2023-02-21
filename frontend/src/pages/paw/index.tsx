import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../../styles/Home.module.css';
import useSWR from 'swr';

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>Paw</p>
      </main>
    </div>
  );
};

export default Index;
