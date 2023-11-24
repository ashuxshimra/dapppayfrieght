import React, { useState } from "react";
import style from "../styles/LoginPage.module.css";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const [creds, setCreds] = useState({
    email: '',
    password: ""
  })
  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('/api/auth/login', {
      email: creds.email,
      password: creds.password
    }).then(res => {
      const token = res.data.jwt_token;
      // console.log(res.data)
      localStorage.setItem('tk', token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('uid', res.data.uid)
      if(res.data.role == 'DRIVER') {
        navigate('/driver')
      } else {
        navigate('/')
      }
    }).catch(err => {
      alert("Email or password is wrong!")
    })
  };

  return (
    <div className={style.container}>
      <header className={style.loginHeader}>
        <h1 className={style.loginh1}>FRIEGHT-TRUCKAPP</h1>
      </header>
      <main className={style.login}>
        <h2 >LOGIN</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <div className={style.inputs}>
            <label className={style.loginLabel} htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setCreds({
                  ...creds,
                  email: e.target.value
                })
              }}
              required
            />
          </div>
          <div className={style.inputs}>
            <label className={style.loginLabel} htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setCreds({
                  ...creds,
                  password: e.target.value
                })
              }}
              required
            />
          </div>
          <div className={style.forgot_password}></div>
          <input className={style.submitBtn} type="submit" name="submit" value="Sign In" />
          <div className={style.go_to_registration}>
            <Link to='/register'>Register</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
