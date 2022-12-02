import type { NextPage } from 'next';
import styles from './Header.module.scss';
import { FaRegBell, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const Header: NextPage = () => {
  const { locale, push, locales } = useRouter();
  const [language, setLanguage] = useState(locale);

  const changeLanguage = (e: any) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    push('/', undefined, { locale: language });
  }, [language]);

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
