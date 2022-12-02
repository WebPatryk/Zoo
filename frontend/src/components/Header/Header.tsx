import type { NextPage } from 'next';
import styles from './Header.module.scss';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header: NextPage = () => {
  const { locale, push } = useRouter();
  const [language, setLanguage] = useState(locale);

  const changeLanguage = (e: any) => {
    const lang = e.target.value;
    setLanguage(e.target.value);
    push('/', undefined, { locale: lang });
  };

  return (
    <div className={styles.container}>
      <select name="" id="" onChange={changeLanguage} value={language}>
        <option value="en">English</option>
        <option value="pl">Polish</option>
        <option value="de">Deutsch</option>
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
