import type { NextPage } from 'next';
import styles from './Navbar.module.scss';
import contactImage from 'assets/contact-image.svg';
import Image from 'next/image';
import Icon from 'assets/icon.png';
import Home from 'assets/icons/home.svg';
import Calendar from 'assets/icons/calendar.svg';
import Paw from 'assets/icons/paw.svg';
import Chat from 'assets/icons/chat.svg';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Navigation {
  icon: SVGAElement;
  label: string;
}

const navigation = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Calendar, label: 'Events', href: '/calendar' },
  { icon: Paw, label: 'Feed animals', href: '/paw' },
  { icon: Chat, label: 'Chat', href: '/chat' }
];

const Navbar: NextPage = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<Navigation>(navigation[0]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  const contentClassname = (item: any) => {
    return item.icon === selectedTab.icon
      ? `${styles['selected']} ${styles.li}`
      : '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={Icon} height={100} width={100} alt="icon" />
      </div>
      <div>
        <ul className={styles.list}>
          {navigation.map(item => (
            <li
              key={item.label}
              className={[contentClassname(item), styles.navbarItem].join(' ')}
              onClick={() => {
                setSelectedTab(item);
              }}
            >
              <Image src={item.icon} height={30} width={30} alt="icon" />
              <Link href={item.href}>{item.label}</Link>
              {item.icon === selectedTab.icon ? (
                <motion.div className={styles.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactImage}>
          <Image src={contactImage} alt="icon" />
        </div>
        <h4>Contact with us</h4>
        <p>Please take a note to is if you have any questions?</p>
        <button className={styles.button}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
