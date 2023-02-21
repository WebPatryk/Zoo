import styles from './Select.module.scss';
import { CSSProperties, useState } from 'react';
import classNames from 'classnames';
import { FaArrowDown, FaSearch, FaTimes } from 'react-icons/fa';
import it from 'node:test';

interface Props {
  style?: CSSProperties;
  type?: 'single' | 'multiple';
  values: Array<any>;
  inputRef?: any;
  setValue: any;
  getValues: any;
}
interface ListElement {
  label: string;
  select: string;
}

const Select = ({
  style,
  type = 'single',
  values,
  inputRef,
  getValues,
  setValue,
  ...rest
}: Props): JSX.Element => {
  const [valuee, setValuee] = useState<Array<ListElement>>([]);
  const [allValues, setAllValues] = useState<Array<ListElement>>(values);
  const [openList, setIsOpenList] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenList(!openList);
  };
  const clearValues = () => {
    setValuee([]);
  };

  const selectElement = (element: ListElement) => {
    const item = valuee.find(el => el.select == element.select);
    if (item) {
      setAllValues(allValues.filter(a => a.label !== item.label));
    } else {
      // type === 'multiple'
      //   ? setValuee([...valuee, element])
      //   : setValuee([element]);
      setValue('lastName', [
        ...getValues('lastName'),
        { label: element.label, select: element.select }
      ]),
        {
          shouldValidate: true,
          shouldDirty: true
        };

      setIsOpenList(!openList);
    }
  };

  return (
    <>
      <div className={styles.select} onClick={handleClick} {...rest}>
        <FaSearch className={styles.icon} />
        {valuee.length > 0 ? (
          <>
            <p className={styles.value}>
              {valuee.map(el => el.label).join(', ')}
            </p>
            <FaTimes className={styles.closeIcon} onClick={clearValues} />
          </>
        ) : (
          <p className={styles.placeholder}>Search....</p>
        )}
      </div>

      {openList && (
        <ul className={styles.selectElements}>
          {allValues.map(value => (
            <li
              key={value.select}
              className={styles.selectElement}
              onClick={() => selectElement(value)}
            >
              {value.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Select;
