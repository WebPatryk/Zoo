import styles from './CustomProgressBar.module.scss';
import { NextPage } from 'next';
import { FaRegClock } from 'react-icons/fa';

interface Progress {
  title: string;
  in_progress: string;
}
interface PropsData {
  progress: Progress;
}

const CustomProgressBar = (props: PropsData) => {
  const { title, in_progress } = props.progress;

  console.log(props);

  const time = '22min';

  return (
    <div className={styles.progressBar}>
      <p className={styles.yourProgress}>Your progress</p>
      <div className={styles.progressInfo}>
        <h3 className={styles.progress}>{in_progress} to complete</h3>
        <div className={styles.progressInfo}>
          <FaRegClock />
          <p>Updated: {time}</p>
        </div>
      </div>
      <div className={styles.progressWrapper}>
        <div className={styles.active} style={{ width: in_progress }} />
      </div>
      {/*<p>{progress.title}</p>*/}
      {/*<p>{progress.in_progress}</p>*/}
    </div>
  );
};

export default CustomProgressBar;
