import type { NextPage } from 'next';
import Login from 'components/Login/Login';
import styles from '../../../styles/Home.module.css';
import { useState } from 'react';

const Index: NextPage = () => {
  const [result, setResult] = useState(0);
  return (
    <>
      <Login />
    </>
  );
};

export default Index;
