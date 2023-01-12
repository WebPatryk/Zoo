import styles from './AddNewEvent.module.scss';

import React, {  useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  description: string;
  password: string;
  pupilName: string;
};

const AddNewEvent = (props: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data);
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSave = () => {
    console.log('Saved');
  };

  const [language, setLanguage] = useState('pl');
  const changeLanguage = (e: any) => {
    const lang = e.target.value;
  };

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

      <div
        style={{
          visibility: props.modal.isOpen() ? 'visible' : 'hidden',
          opacity: props.modal.isOpen() ? '1' : '0'
        }}
        className={styles.overlay}
      >
        <div className={styles.popup}>
          <h2>{props.title}</h2>
          <span className={styles.close} onClick={() => props.modal.close()}>
            &times;
          </span>
          <div className={styles.content}>
            {/*<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    placeholder="Name"*/}
            {/*    className={styles.input}*/}
            {/*    {...register('name', {*/}
            {/*      required: 'Name is required',*/}
            {/*      minLength: {*/}
            {/*        value: 6,*/}
            {/*        message: 'Name is too short'*/}
            {/*      },*/}
            {/*      maxLength: {*/}
            {/*        value: 40,*/}
            {/*        message: 'Name is too long'*/}
            {/*      }*/}
            {/*    })}*/}
            {/*  />*/}
            {/*  <ErrorMessage*/}
            {/*    errors={errors}*/}
            {/*    name="name"*/}
            {/*    as="p"*/}
            {/*    className={styles.error}*/}
            {/*  />*/}
            {/*  <textarea*/}
            {/*    placeholder="Description"*/}
            {/*    className={styles.input}*/}
            {/*    {...register('description', {*/}
            {/*      required: 'Description is required',*/}

            {/*      minLength: {*/}
            {/*        value: 6,*/}
            {/*        message: 'Description is too short'*/}
            {/*      },*/}
            {/*      maxLength: {*/}
            {/*        value: 40,*/}
            {/*        message: 'Description is too long'*/}
            {/*      }*/}
            {/*    })}*/}
            {/*  />*/}
            {/*  <ErrorMessage*/}
            {/*    errors={errors}*/}
            {/*    name="description"*/}
            {/*    as="p"*/}
            {/*    className={styles.error}*/}
            {/*  />*/}
            {/*  <div className={styles.passwordWrapper}>*/}
            {/*    <select name="" id="" onChange={changeLanguage} value={language}>*/}
            {/*      <option value="en">English</option>*/}
            {/*      <option value="pl">Polish</option>*/}
            {/*      <option value="de">Deutsch</option>*/}
            {/*    </select>*/}
            {/*  </div>*/}

            {/*  <div className="row">*/}
            {/*    <div className="form-group col-sm-3 col-sm-offset-2 col-xs-10">*/}
            {/*      <input*/}
            {/*        id="filename-upload"*/}
            {/*        placeholder="Bild hochladen"*/}
            {/*        // disabled="disabled"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="form-group mobile-col-1 col-xs-1">*/}
            {/*      <label className="btn-file-upload">*/}
            {/*        <span className="glyphicon glyphicon-file"></span>*/}
            {/*        <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />*/}
            {/*        <input*/}
            {/*          type="file"*/}
            {/*          name="pictures"*/}
            {/*          accept="image/*"*/}
            {/*          hidden*/}
            {/*          id="a"*/}
            {/*        />*/}
            {/*      </label>*/}
            {/*    </div>*/}

            {/*    <div className="form-group col-sm-4 col-xs-12">*/}
            {/*      <label htmlFor="a" className="img-responsive img-preview">*/}
            {/*        <div>Choose image</div>*/}
            {/*      </label>*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*  <button type="submit" className={styles.button}>*/}
            {/*    Submit*/}
            {/*  </button>*/}
            {/*  <p className={styles.noAccount}>*/}
            {/*    Already have an account?*/}
            {/*    <Link href="/login">*/}
            {/*      <span className={styles.signUpText}>Log in</span>*/}
            {/*    </Link>*/}
            {/*  </p>*/}

            {/*  <hr />*/}

            {/*  <button type="submit" className={styles.facebookButton}>*/}
            {/*    Sign up with Facebook*/}
            {/*  </button>*/}
            {/*</form>*/}

            <div>
              <button onClick={() => props.modal.close()}>Cancel</button>

              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddNewEvent;
