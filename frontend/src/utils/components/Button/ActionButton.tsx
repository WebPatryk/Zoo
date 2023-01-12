import styles from './ActionButton.module.scss';
import { FaPlus } from 'react-icons/fa';
import { CSSProperties } from 'react';
import classNames from 'classnames';

interface Props {
  style?: CSSProperties;
  type?: 'circle' | 'rectangle';
  onClick: () => void;
}

const ActionButton = ({ style, type, ...rest }: Props): JSX.Element => {
  return (
    <button
      className={classNames(
        styles.button,
        type === 'circle' ? styles.circle : styles.rectangle
      )}
      {...rest}
      style={style}
    >
      <FaPlus />
    </button>
  );
};

export default ActionButton;
