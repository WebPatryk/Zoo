import type { NextPage } from 'next';
// import Login from 'components/Login/Login';
import styles from '../../../styles/Home.module.css';
import { useState } from 'react';

const Index: NextPage = () => {
  const [result, setResult] = useState(0);
  return (
    <div>
      <div data-testid="result">{result}</div>
      <button
        onClick={() => setResult(result + 1)}
        className={styles.button}
        data-testid="add"
      >
        Add
      </button>
      {/*<Login />*/}
    </div>
  );
};

export default Index;
