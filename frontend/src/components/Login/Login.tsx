import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import dog from 'assets/dog.svg';
import icon from 'assets/icon.png';
import Image from 'next/image';
import styles from './Login.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ErrorMessage } from '@hookform/error-message';
import { log } from 'util';

type Inputs = {
  name: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async userData => {
    console.log(userData);

    // const { username, password } = data;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
  };

  const getUser = async () => {
    const response = await fetch('/api/auth/user');

    const data = await response.json();

    console.log(data);
  };

  const logout = async () => {
    const response = await fetch('/api/auth/logout');

    const data = await response.json();

    console.log(data);
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.image}>
          <Image src={dog} height={500} width={500} alt="icon" />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Image src={icon} height={100} width={100} alt="Dog image" />
        <h1 className={styles.title}>Login</h1>
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

          <button type="submit" className={styles.button}>
            Submit
          </button>
          <p className={styles.noAccount}>
            Don't have an account
            <Link href="/register">
              <a className={styles.signUpText}>Sign up</a>
            </Link>
          </p>
        </form>

        <button onClick={getUser}>Get user data</button>
        <br />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Login;
