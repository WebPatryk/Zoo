// import React, { createContext, useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import Router, { useRouter } from 'next/router';
//
// //api here is an axios instance which has the baseURL set according to the env.
// import api from 'api';
//
// const AuthContext = createContext({});
//
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     async function loadUserFromCookies() {
//       const token = Cookies.get('JWT');
//       if (token) {
//         console.log("Got a token in the cookies, let's see if it is valid");
//         api.defaults.headers.Authorization = `Bearer ${token}`;
//         const { data: user } = await api.get('users/me');
//         if (user) setUser(user);
//       }
//       setLoading(false);
//     }
//     loadUserFromCookies();
//   }, []);
//
//   const login = async (email, password) => {
//     const { data: token } = await api.post('auth/login', { email, password });
//     if (token) {
//       console.log('Got token');
//       Cookies.set('token', token, { expires: 60 });
//       api.defaults.headers.Authorization = `Bearer ${token.token}`;
//       const { data: user } = await api.get('users/me');
//       setUser(user);
//       console.log('Got user', user);
//     }
//   };
//
//   const logout = (email, password) => {
//     Cookies.remove('token');
//     setUser(null);
//     delete api.defaults.headers.Authorization;
//     window.location.pathname = '/login';
//   };
//
//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated: !!user, user, login, loading, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => useContext(AuthContext);
//
// export const ProtectRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   if (typeof window !== 'undefined') {
//     if (
//       isLoading ||
//       (!isAuthenticated && window.location.pathname !== '/login')
//     ) {
//       return <p>Loading....</p>;
//     }
//   }
//   return children;
// };

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import styles from '../styles/layout.module.css';

export default function LayoutAuthenticated(props) {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await fetch(`http://localhost:3001`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    if (res.ok) {
      const json = await res.json();
      setProfile(json);
    } else {
      router.push('/login');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    router.push('/');
  }

  return <div> {props.children}</div>;
}
