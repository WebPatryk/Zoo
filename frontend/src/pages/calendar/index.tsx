import styles from './Calendar.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import Modal, { useModal } from '../../hooks/modal/useModal';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionButton from '../../utils/components/Button/ActionButton';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

type Inputs = {
  name: string;
  description: string;
  password: string;
  pupilName: string;
};

const Index = ({
  eventsData
}: {
  eventsData: EventInterface[];
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  const handleSave = () => {
    console.log('Saved');
  };

  const [language, setLanguage] = useState('pl');
  const changeLanguage = (e: any) => {
    const lang = e.target.value;
  };

  const modal = useModal<any>();

  const openNewEventModal = () => {
    modal.open();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p className={styles.mainTitle}>The latest events</p>

        <ActionButton
          type={'circle'}
          style={{ marginLeft: 'auto' }}
          onClick={openNewEventModal}
        />

        <div className={styles.eventsList}>
          {eventsData.map((event: EventInterface) => (
            <div className={styles.eventBox} key={event._id}>
              <img
                src={event.image}
                height={100}
                width={100}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                alt="icon"
              />
              <div className={styles.info}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        {modal.isOpen() && (
          <Modal
            title={'Add New Event'}
            buttons={{
              close: {
                onClick() {
                  modal.close();
                  clearErrors();
                }
              },
              confirm: {
                onClick() {
                  handleSubmit(onSubmit)();
                  // formref.current.dispatchEvent(
                  //   new Event('submit', { cancelable: true, bubbles: true })

                  handleSubmit(onSubmit);
                  clearErrors();
                  // console.log();
                  // modal.close();
                }
              }
            }}
          >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 6,
                    message: 'Name is too short'
                  },
                  maxLength: {
                    value: 40,
                    message: 'Name is too long'
                  }
                })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                as="p"
                className={styles.error}
              />
              <textarea
                placeholder="Description"
                className={styles.input}
                {...register('description', {
                  required: 'Description is required',

                  minLength: {
                    value: 6,
                    message: 'Description is too short'
                  },
                  maxLength: {
                    value: 40,
                    message: 'Description is too long'
                  }
                })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                as="p"
                className={styles.error}
              />
              <div className={styles.passwordWrapper}>
                <select
                  name=""
                  id=""
                  onChange={changeLanguage}
                  value={language}
                >
                  <option value="en">English</option>
                  <option value="pl">Polish</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="row">
                <div className="form-group mobile-col-1 col-xs-1">
                  <label className="btn-file-upload">
                    <span className="glyphicon glyphicon-file"></span>
                    <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
                    <input
                      type="file"
                      name="pictures"
                      accept="image/*"
                      hidden
                      id="a"
                    />
                  </label>
                </div>

                <div className="form-group col-sm-4 col-xs-12">
                  <label htmlFor="a" className="img-responsive img-preview">
                    <div>Choose image</div>
                  </label>
                </div>
              </div>
            </form>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default Index;

export async function getStaticProps({ locale }: { locale: any }) {
  const res = await fetch('http://localhost:3001/events');
  const eventsData = await res.json();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      eventsData
    }
  };
}
