import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './Feed.module.scss';
import hand from '../../assets/hand.png';

const Feed: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Feeded animals</h3>
      <Image src={hand} height={30} width={30} alt="icon" />
      {/*Carusel*/}
    </div>
  );
};

export default Feed;
