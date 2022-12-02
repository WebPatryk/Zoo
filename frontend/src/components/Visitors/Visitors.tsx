import type { NextPage } from 'next';
import styles from './Visitors.module.scss';

const Visitors: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Zoo's Visitors</h3>
      <img
        src="https://www.shutterstock.com/image-vector/set-colourful-business-charts-diagram-260nw-1388414240.jpg"
        alt=""
      />
      {/*Chart*/}
    </div>
  );
};

export default Visitors;
