// import ActionButton from 'components/Buttons/ActionButton';
// import { CardHeader } from 'components/Content/Card';
import React, { MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Modal.module.scss';
import { motion } from 'framer-motion';

interface ModalButtonArgs {
  onClick: () => void;
  label?: string;
  icon?: string;
}

interface Args {
  children: any;
  size?: string;
  title?: string;
  buttons?: {
    confirm: ModalButtonArgs;
    close?: ModalButtonArgs;
  };
  className?: string;
}
const Backdrop = ({ children, onClick }: any) => {
  return (
    <motion.div
      onClick={onClick}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default function Modal({
  children,
  size,
  title,
  buttons,
  className
}: Args) {
  const { t } = useTranslation('common');

  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: '100vh',
      opacity: 0
    }
  };

  return (
    <Backdrop onClick={buttons && buttons.close?.onClick}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className={styles.popup}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>
          <h2>{title}</h2>
          {buttons && (
            <span className={styles.close} onClick={buttons.close?.onClick}>
              &times;
            </span>
          )}
          <div className={styles.content}>
            {children}

            {/*<div>*/}
            {/*  <button onClick={() => props.modal.close()}>Cancel</button>*/}

            {/*  <button onClick={handleSave}>Save</button>*/}
            {/*</div>*/}
            <div>
              {buttons && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '2rem 0 1rem 0'
                  }}
                >
                  {buttons.close && (
                    // <ActionButton
                    //   text={buttons.close.label ?? t('cancel')}
                    //   icon={buttons.close.icon ?? 'fas fa-chevron-circle-left'}
                    //   onClick={buttons.close.onClick}
                    // />
                    <button
                      onClick={buttons.close.onClick}
                      style={{
                        backgroundColor: '#ffad0d',
                        padding: '0.8rem 1.6rem',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '3px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {buttons.close.label ?? 'Cancel'}
                    </button>
                  )}
                  {buttons.confirm && (
                    // <ActionButton
                    //   text={buttons.confirm.label ?? t('save')}
                    //   icon={buttons.confirm.icon ?? 'fas fa-check-circle'}
                    //   onClick={buttons.confirm.onClick}
                    // />
                    <button
                      onClick={buttons.confirm.onClick}
                      style={{
                        backgroundColor: '#ffad0d',
                        padding: '0.8rem 1.6rem',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '3px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {buttons.confirm.label ?? 'Save'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
}

export interface ModalOperations<T> {
  data: T | undefined;
  isOpen(): boolean;
  close(data?: T): void;
  open(data?: T): void;
}

/**
 * if generic is not provided, then with proper use ```onClick={modal.open|close}```
 * default will be MouseEventHandler
 * <pre>
 *     const modal = useModal();
 *     return <ActionButton text={'ddd'} onClick={modal.open}/>
 * </pre>
 * @param openDefault
 * @param dataDefault
 */
export function useModal<T = MouseEventHandler<any>>(
  openDefault = false,
  dataDefault = undefined
): ModalOperations<T> {
  const [isModalOpen, setIsModalOpen] = useState(openDefault);
  const [data, setData] = useState<T | undefined>(dataDefault);
  return {
    data,
    isOpen(): boolean {
      return isModalOpen;
    },
    close(data?: T) {
      // IMPORTANT: DO NOT CHANGE first we need to close, next change data
      setIsModalOpen(false);
      setData(data);
    },
    open(data?: T) {
      // IMPORTANT: THERE WE NEED TO SET DATA FIRST, because reactivity works there and outer component can
      // be dependent on '.isOpen()' function and data inside of it can render stuff using 'data' variable
      setData(data);
      setIsModalOpen(true);
    }
  };
}
