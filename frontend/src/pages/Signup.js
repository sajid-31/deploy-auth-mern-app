import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import{Link, useNavigate} from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
function Signup() {

    const [SignupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name,value} = e.target;
        const copySignupInfo = {...SignupInfo}
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo)
    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name,email,password} = SignupInfo
        if(!name || !email || !password){
            return handleError('invalid form')
        }
        try{
            const url = "https://deploy-auth-mern-app-api.vercel.app/auth/signup"
            const response = await fetch(url,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SignupInfo)
            })
            const result = await response.json();
            console.log(result);
            const {success,message,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={SignupInfo.name}
                        
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={SignupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={SignupInfo.password}
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
    </div>
    
  )
}

export default Signup
