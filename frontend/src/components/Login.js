// src/components/RegisterForm.js

import React, { useState } from "react";
import { Form, Button,  } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import { useDispatch } from "react-redux";

const Login = () => {
  const{authUser,setAuthUser,isLoggedIn,setIsLoggedIn}=useAuth()

  

  const navigate=useNavigate()
  const[data,setData]=useState([])

  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[mob,setMob]=useState("")
  const[gender,setGender]=useState("")
  const[password,setPassword]=useState("")
  const[auth,setAuth]=useState(false)

  

  const handleSubmit = (e) => {
    e.preventDefault();
    
   

    axios
      .post("http://localhost:3000/login", {name,email,mob,gender,password})
      .then((response) =>{let mui=response.data
        setData(mui)
        setAuthUser(response.data.name)
       
        setIsLoggedIn(true)
      
       /*  navigate('/') */
        // Reset the form
        {setName("")
        setEmail("")
        setGender("")
        setMob("")
        setPassword("")}
      })
      .catch((error) => {
        alert("Email Not exist")
        console.error(error);
      });
     
   
  };
  console.log(data.password,"datat")

 const clickHandler=()=>{
    window.location.reload()
 }
 const UserClick=()=>{
  navigate("/")
 }


  return (
    <>
    {
        !isLoggedIn?<>
        
     <div className="container">
        <h1>Login</h1>
       
        <form onSubmit={handleSubmit}>
          
          <div className="register-section container text-left">
          
            
            <div className="mb-0">
              <label for="exampleFormControlInput1" classNme="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                
                id="Email"
              
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter email here...."
              />
            </div>
           
            
            <div className="mb-0">
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password" onChange={(e)=>setPassword(e.target.value)}
                className="form-control"
                id="Password"
                placeholder="Enter Password..."
              />
            </div>



            <div className="mb-0 mt-2">
              <button type="submit" className="btn btn-success">
                Login
              </button>
              
              
            </div>
          </div>
        </form>
      </div></>:<>
      <h2>{data.name}</h2>
        <p>{data.email}</p>
        <p>{data.status}</p>
        <button className="btn btn-secondary" onClick={clickHandler}>Logout</button>
        <button className="btn btn-success mx-2" onClick={UserClick}>UserList</button>
       </>
    }
   

    </>
  );
};

export default Login;
