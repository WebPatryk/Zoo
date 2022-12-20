import type { NextPage } from 'next';
import styles from './Header.module.scss';
import {
  FaCog,
  FaRegBell,
  FaSignOutAlt,
  FaUser,
  FaUserCircle
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

const Header: NextPage = () => {
  const { locale, push } = useRouter();
  const [language, setLanguage] = useState(locale);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const changeLanguage = (e: any) => {
    const lang = e.target.value;
    setLanguage(e.target.value);
    push('/', undefined, { locale: lang });
  };

  const toggleOpenModal = () => {};

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
        <p
          className={styles.userName}
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          Thomas Anders
        </p>
        {isOpenModal && (
          <div className={styles.userModal}>
            <div>
              <Link href="/" className={styles.useModalElement}>
                <FaUser className={styles.bell} />
                <p className={styles.a}>Profile</p>
              </Link>
              <Link href="/" className={styles.useModalElement}>
                <FaCog className={styles.bell} />
                <p className={styles.a}>Settings</p>
              </Link>
              <Link href="/" className={styles.useModalElement}>
                <FaSignOutAlt className={styles.bell} />
                <p className={styles.a}>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
