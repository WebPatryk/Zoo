import type { NextPage } from 'next';
import styles from './Header.module.scss';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';

const Header: NextPage = () => {
  return (
    <div className={styles.container}>
      <select name="" id="">
        <option value="">English</option>
        <option value="">Polish</option>
        <option value="">Deutsch</option>
      </select>
      <div className={styles.bellContainer}>
        <FaRegBell className={styles.bell} />
        <p className={styles.notificationCount}>1</p>
      </div>
      <div className={styles.userContainer}>
        <FaUserCircle className={styles.userLogo} />
        <p className={styles.userName}>Thomas Anders</p>
      </div>
    </div>
  );
};

export default Header;
