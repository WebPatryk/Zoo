import type { NextPage } from 'next';
import Image from 'next/image';
import hand from 'assets/hand.png';
import styles from './Greetings.module.scss';

const Greetings: NextPage = () => {
  const user = 'Patryk';
  const text =
    'Help other animals in frontend buying food for them, taking part in events and much much more. Find a people whose share your passion to animals and spend time together.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.userContent}>
        <Image src={hand} height={30} width={30} alt="icon" />
        <h1>Hello {user}</h1>
      </div>
      <p className={styles.appDescription}>{text}</p>
    </div>
  );
};

export default Greetings;
