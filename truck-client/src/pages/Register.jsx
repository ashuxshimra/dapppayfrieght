import React, { useState } from 'react'
import style from '../styles/RegsiterStyle.module.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    const [creds, setCreds] = useState({
        email: '',
        password: "",
        role: 'SHIPPER'
    })
    const handleRegister = (event) => {
        event.preventDefault()
        axios.post('/api/auth/register', {
            email: creds.email,
            password: creds.password,
            role: creds.role
        }).then(res => {
            // const token = res.data.jwt_token;
            // localStorage.setItem('tk', token)
            // localStorage.setItem('role', creds.role)
            // if(creds.role == 'DRIVER') {
                navigate('/login')
            // } else {
            //     navigate('/')
            // }
        }).catch(err => {
            alert("Something went wrong!")
        })
    }
  return (
    <div className={style.container}>
    <header className={style.registerHeader}>
        <h1 className={style.h1}>FRIEGHT-TRUCKAPP</h1>
    </header>
    <main className={style.registration}>
        <h2>REGISTRATION</h2>
        <form className={style.loginForm} onSubmit={handleRegister}>
            <div className={style.inputs}>
                <label className={style.registerLabel} htmlFor="email">Email:</label>
                <input onChange={(e) => setCreds({
                    ...creds,
                    email: e.target.value
                })} type="email" name="email" id="email" placeholder="Enter an email" required/>
            </div>
            <div className={style.inputs}>
                <label className={style.registerLabel} htmlFor="password">Password:</label>
                <input type="password" onChange={(e) => setCreds({
                    ...creds,
                    password: e.target.value
                })} name="password" id="password" placeholder="Enter a password" required/>
            </div>
            <div className={style.select}>
                <label className={style.registerLabel} htmlFor="roles">Role:</label>
                <select id="roles" name="roles" onChange={(e) => setCreds({
                    ...creds,
                    role: e.target.value
                })}>
                    <option value="SHIPPER">Shipper</option>
                    <option value="DRIVER">Driver</option>
                </select>
            </div>
            <input className='submitBtn' type="submit" name="submit" value="Sign Up"/>
            <div className={style.go_to_login}>
            <Link to='/login'>Sign in</Link>
            </div>
        </form>
    </main>
</div>
  )
}

export default Register