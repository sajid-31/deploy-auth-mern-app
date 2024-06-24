import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import{Link, useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [LoginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name,value} = e.target;
        const copyLoginInfo = {...LoginInfo}
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo)
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {email,password} = LoginInfo
        if( !email || !password){
            return handleError('invalid form')
        }
        try{
            const url = "https://deploy-auth-mern-app-api.vercel.app/auth/login"
            const response = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginInfo)
            })
            const result = await response.json();
            console.log(result);
            const {success,message,error, jwtToken, name} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            } else if(error){
                const details = error?.details[0].message;
                handleError(details);
            } else if(!success){
                handleError(message);
            }
        }catch(err){
            handleError(err)
        }
    }
  return (
    <div className='container'>
        <h1>Login Up</h1>
        <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={LoginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={LoginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            <ToastContainer />
    </div>
    
  )
}

export default Login
