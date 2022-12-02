// import styles from './Event.module.scss';
import { NextPage } from 'next';

const CustomProgressBar = ({ progress }: { progress: any }) => {
  const progressWrapper: any = {
    width: '26rem',
    height: 10,
    backgroundColor: 'gray',
    position: 'relative'
  };
  const active: any = {
    backgroundColor: 'red',
    width: progress.in_progress,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '10px'
  };
  return (
    <div>
      <div style={progressWrapper}>
        <div style={active} />
      </div>
      <p>{progress.title}</p>
      <p>{progress.in_progress}</p>
    </div>
  );
};

export default CustomProgressBar;
