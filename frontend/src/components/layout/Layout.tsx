import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import Image from 'next/image';
import Footer from '../Footer/Footer';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props): JSX.Element => {
  return (
    <div {...props}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.main}>
          <Header />
          <main>
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
