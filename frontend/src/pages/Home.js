import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess,handleError } from '../utils';
import {ToastContainer} from 'react-toastify';
function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [Products, setProducts] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
  const handleLogout = (e) => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    handleSuccess('user logged out')
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  const fetchProducts = async () => {
    try{
        const url = 'http://localhost:8080/products'
        const headers = {
          headers : {
            'Authorization' : localStorage.getItem('token')
          }
        }
        const response = await fetch(url,headers);
        const result = await response.json();
        console.log(result);
        setProducts(result);
    } catch(err){
      handleError(err);
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])


  return (<>
            <div>Home</div>
            <div>{loggedInUser}</div>
            <button onClick={handleLogout}>Log OUt</button>

            <div>
              {
                Products && Products?.map((item,index)=>{
                  <ul key={index}>
                    <span>{item.name}  : {item.price} </span>
                  </ul>
                })
              }
            </div>

            <ToastContainer />
          </>
    
  )
}

export default Home