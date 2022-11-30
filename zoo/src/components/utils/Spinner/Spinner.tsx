import type { NextPage } from 'next';
import styles from './Spinner.module.scss';

const Spinner: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
