import styles from './Calendar.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Modal, { useModal } from '../../hooks/modal/useModal';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionButton from '../../utils/components/Button/ActionButton';
import Select from '../../components/utils/components/Select/Select';
import classNames from 'classnames';
import { FaUpload } from 'react-icons/fa';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;
import { Controller } from 'swiper';
import { useRouter } from 'next/router';
import useSWR from 'swr';

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
  lastName: string;
  gender: string;
  image: FormData;
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export const preventBrowserDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

export const fileValidator = (files, config) => {
  const { allowedFileFormats, fileSizeMBLimit, filesLimit } = config;
  const { length } = files;
  const { size, type } = files[0];
  let err = false;
  let result = {
    isValidFile: false,
    errVal: err
  };
  if (length === 0) {
    return result;
  } else if (length > filesLimit) {
    err =
      filesLimit > 1
        ? `Only ${filesLimit} files are allowed to upload`
        : `Only one file is allowed to upload`;
  } else if (!allowedFileFormats.includes(type)) {
    err = 'File format must be either png or jpg';
  } else if (size / 1024 / 1024 > fileSizeMBLimit) {
    err = `File size exceeded the limit of ${fileSizeMBLimit}MB`;
  } else {
    result.isValidFile = true;
  }
  result.errVal = err;
  return result;
};

const Index = (
  {
    // eventsData
    // }: {
    //   eventsData: EventInterface[];
  }
): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    // formState: { errors },
    control,
    setValue,
    getValues
  } = useForm<Inputs>();

  // const fetcher = (...args) => fetch(...args).then(res => res.json());
  //
  // const { data, error, isLoading } = useSWR(
  //   'http://localhost:3001/events',
  //   fetcher
  // );

  // const fetcher = (...args) => fetch(...args).then(res => res.json());
  // const { data, error } = useSWR('http://localhost:3000/events', fetcher);
  // //const[displayNumber] = useState(data.currentInfo.randomString) //Needs null checks ofcourse
  // //With null checks
  // const [displayNumber] = useState(
  //   (data && data.currentInfo && data.currentInfo.randomString) || undefined
  // );
  // //OR
  // //const[displayNumber] = useState(data?.currentInfo?.randomString)
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // const [tia, setTia] = useState([]);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    console.log(uploadImage);

    const res = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesuada urna varius a. Ut nulla lectus, pharetra in malesuada sit amet, faucibus vitae est.',
        image:
          'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
        localization: 'Paddock on Pieskarska Street',
        starts_at: '1970-01-20T07:44:30.461Z',
        title: "Dog's party"
      })
    });

    const eventsData = await res.json();
    if (res.status < 300) {
      refreshData();
    }
    console.log(eventsData);
  };

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // const imageFileRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    console.log('Saved');
  };

  // const [language, setLanguage] = useState('pl');
  // const [image, setImage] = useState<any>(null);

  // const [uploadImage, setUploadImage] = useState<File | null>(null);

  const changeLanguage = (e: any) => {
    const lang = e.target.value;
  };

  const languages = [
    { label: 'Polish', select: 'polish' },
    { label: 'English', select: 'english' },
    { label: 'Deutsch', select: 'deutsch' }
  ];

  const modal = useModal<any>();

  const openNewEventModal = () => {
    modal.open();
  };
  const putImage = (e: any) => {
    console.log('handleFileInput working!');
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setImage(formData);
  };

  const onFileDrop = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const newImage: File = (target.files as FileList)[0];
    let reader = new FileReader();
    reader.readAsDataURL(newImage);
    console.log('eee');
    reader.onload = () => {
      if (newImage) {
        setUploadImage(reader.result);
        console.log(reader.result);
        setData(newImage);
      }
    };
    // if (newImage) {
    //   setUploadImage(newImage);
    // }
    console.log(newImage);
  };

  let [dragOverlay, setDragOverlay] = useState(false);
  // const [data, setData] = useState(false);
  // const [error, setError] = useState(false);
  let dragCounter = useRef(0);

  const config = {
    allowedFileFormats: ['image/jpeg', 'image/jpg', 'image/png'],
    fileSizeMBLimit: 20,
    filesLimit: 1
  };

  const FILE_UPLOADER_STATE = {
    INIT: 'INIT',
    PROCESSING: 'PROCESSING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
  };
  const [imagee, setImagee] = useState({ preview: '', data: '' });
  const processDrop = files => {
    //Simulate async request for file upload
    setTimeout(() => {
      // setLoaderState(FILE_UPLOADER_STATE.PROCESSING);
    }, 1000);
    setTimeout(() => {
      // setLoaderState(FILE_UPLOADER_STATE.SUCCESS);
    }, 3000);
  };

  const handleDrag = e => {
    preventBrowserDefaults(e);
  };
  const handleDragIn = e => {
    preventBrowserDefaults(e);
    dragCounter.current++;
    // if (get(e, 'dataTransfer.items.length') > 0) {
    setDragOverlay(true);
    // }
  };
  const handleDragOut = e => {
    preventBrowserDefaults(e);
    dragCounter.current--;
    console.log(dragCounter);
    if (dragCounter.current === 0) {
      setDragOverlay(false);
    }
  };
  const handleDrop = e => {
    console.log(e);
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      // setImagee(reader.result);
      setData(reader.result);
    };

    // const files = get(e, 'dataTransfer.files');
    // const files = e.target.files[0];
    // preventBrowserDefaults(e);
    // setDragOverlay(false);
    // setError(false);
    // dragCounter.current = 0;
    // const { isValidFile, errVal } = fileValidator(files, config);
    // if (!isValidFile) {
    //   if (errVal) {
    //     setError(errVal);
    //   }
    //   return false;
    // }
    // fileReader(files);
    // processDrop(files);
  };
  // useEffect(() => {
  //   {
  //     register('lastName', {
  //       required: 'last Name is required'
  //       // deps: ['inputA', 'inputB']
  //       // minLength: {
  //       //   value: 6,
  //       //   message: 'Description is too short'
  //       // },
  //       // maxLength: {
  //       //   value: 40,
  //       //   message: 'Description is too long'
  //       // }
  //     });
  //   }
  //
  //   setValue('lastName', []);
  // }, []);

  const fileReader = files => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = loadEvt => {
      setData(loadEvt.target.result);
    };
  };

  const dragOverlayClass = dragOverlay ? styles.overlay : '';
  //
  // useEffect(() => {
  //   if (data) {
  //     setTia(data);
  //   }
  // }, [data]);

  // @ts-ignore
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
          {data.map((event: EventInterface) => (
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
            isOpen={modal.isOpen()}
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
                // errors={errors}
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
                // errors={errors}
                name="description"
                as="p"
                className={styles.error}
              />

              <div className={styles.passwordWrapper}>
                <select {...register('gender')}>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
                <input type="file" id="image" {...register('image')} />
                {/*<Select*/}
                {/*  values={languages}*/}
                {/*  type="multiple"*/}
                {/*  setValue={setValue}*/}
                {/*  getValues={getValues}*/}
                {/*/>*/}
                {/*<input*/}
                {/*  type="text"*/}
                {/*  {...register('lastName', {*/}
                {/*    required: 'Description is required',*/}

                {/*    minLength: {*/}
                {/*      value: 6,*/}
                {/*      message: 'Description is too short'*/}
                {/*    },*/}
                {/*    maxLength: {*/}
                {/*      value: 40,*/}
                {/*      message: 'Description is too long'*/}
                {/*    }*/}
                {/*  })}*/}
                {/*/>*/}
                {/*<ErrorMessage*/}
                {/*  errors={errors}*/}
                {/*  name="lastName"*/}
                {/*  as="p"*/}
                {/*  className={styles.error}*/}
                {/*/>*/}
              </div>
              {/*<input*/}
              {/*  type="file"*/}
              {/*  onChange={onFileDrop}*/}
              {/*  id="image"*/}
              {/*  className={styles.fileInput}*/}
              {/*/>*/}
              {/*/!*{...register('description', {*!/*/}
              {/*<label htmlFor="image" className={styles.dropfileinputlabel}>*/}
              {/*  <div*/}
              {/*    className={classNames(*/}
              {/*      styles.dropDownContainer,*/}
              {/*      dragOverlayClass*/}
              {/*    )}*/}
              {/*  >*/}
              {/*    {error && <p className="error">{error}</p>}*/}
              {/*    <div*/}
              {/*      onDragEnter={handleDragIn}*/}
              {/*      onDragLeave={handleDragOut}*/}
              {/*      onDragOver={handleDrag}*/}
              {/*      onDrop={handleDrop}*/}
              {/*    >*/}
              {/*      <FaUpload className={styles.dropIcon} />*/}
              {/*      <div>Drag and drop files here</div>*/}
              {/*      <div>State machine based on file upload</div>*/}
              {/*      <div className="button-wrapper">*/}
              {/*        {data && (*/}
              {/*          <>*/}
              {/*            <p>{data.name}</p>*/}
              {/*            <button onClick={() => setData(false)}>Remove</button>*/}
              {/*          </>*/}
              {/*        )}*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</label>*/}
            </form>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ locale }: { locale: any }) {
  // const res = await fetch('http://localhost:3001/events');
  // const eventsData = await res.json();
  // if (!eventsData) {
  //   return { notFound: true };
  // }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // eventsData
    }
  };
}
