import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        const tk = localStorage.getItem('tk')
        if(tk == null || tk == '') {
            navigate('/login')
        } else {
          const role = localStorage.getItem('role')
          if(role == 'DRIVER') {
            navigate('/driver')
          } else {
            navigate('/home')
          }
        }
    }, [])
  return (
    <>{children}</>
  )
}

export default Auth