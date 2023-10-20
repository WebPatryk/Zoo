import type { NextPage } from 'next';
import personWithDog from 'assets/person-with-dog.svg';
import Image from 'next/image';
import styles from './Register.module.scss';
import icon from '../../assets/icon.png';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type Inputs = {
  name: string;
  email: string;
  password: string;
  pupilName: string;
};

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.image}>
          <Image src={personWithDog} height={600} width={600} alt="icon" />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Image
          src={icon}
          height={100}
          width={100}
          alt="Person with dog image"
        />
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>To animals word's</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            {...register('name', {
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username is too short'
              },
              maxLength: {
                value: 40,
                message: 'Username is too long'
              }
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            as="p"
            className={styles.error}
          />
          <input
            type="text"
            placeholder="E-mail"
            className={styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email is not valie'
              },
              minLength: {
                value: 6,
                message: 'Username is too short'
              },
              maxLength: {
                value: 40,
                message: 'Email is too long'
              }
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            as="p"
            className={styles.error}
          />
          <div className={styles.passwordWrapper}>
            <input
              type={passwordShown ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Password is too long'
                }
              })}
            />
            {passwordShown ? (
              <FaRegEye
                className={styles.passwordIcon}
                onClick={togglePassword}
              />
            ) : (
              <FaRegEyeSlash
                className={styles.passwordIcon}
                onClick={togglePassword}
              />
            )}
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            as="p"
            className={styles.error}
          />
          <input
            type="text"
            placeholder="Pupil's name"
            className={styles.input}
            {...register('pupilName', {
              required: "Pupil's name is required",
              minLength: {
                value: 6,
                message: "Pupil's is too short"
              },
              maxLength: {
                value: 40,
                message: "Pupil's is too long"
              }
            })}
          />
          <ErrorMessage
            errors={errors}
            name="pupilName"
            as="p"
            className={styles.error}
          />
          <button type="submit" className={styles.button}>
            Submit
          </button>
          <p className={styles.noAccount}>
            Already have an account?
            <Link href="/login">
              <span className={styles.signUpText}>Log in</span>
            </Link>
          </p>

          <hr />

          <button type="submit" className={styles.facebookButton}>
            Sign up with Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
