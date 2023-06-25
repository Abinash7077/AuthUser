// src/components/RegisterForm.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate=useNavigate()


const[profile_pic,setProfile_pic]=useState()
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[gender,setGender]=useState("")
  const[password,setPassword]=useState("")

  const handleFile=(e)=>{
    setProfile_pic(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/users", {name,email,phone,gender,password,profile_pic})
      .then((response) => {
        console.log(response.data);
        navigate("/")

        // Reset the form
        
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
   

   <div className="container">
        <h1>Register</h1>
        <img src={profile_pic} alt="" />
        <form onSubmit={handleSubmit}>
          
          <div className="register-section container text-left">
          <div className="mb-0 ">
              <label for="exampleFormControlInput1" class="form-label">
                Profile pic
              </label>
              <input
                type="file"
                name="profile_pic"
               onChange={handleFile}
                className="form-control"
                 placeholder="Upload Image"
              />
            
            </div>
            <div className="mb-0 ">
              <label for="exampleFormControlInput1" class="form-label">
                User ID
              </label>
              <input
                type="text"
               
                className="form-control"
                id="UserID"
                placeholder="Enter user id"
              />
            </div>
            <div className="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={(e)=>setName(e.target.value)}
                className="form-control"
                id="Name"
                placeholder="Enter name here...."
              />
            </div>
            <div className="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
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
              <label for="exampleFormControlInput1" class="form-label">
                Gender
              </label>
              <select class="form-select" 
           onChange={(e)=>setGender(e.target.value)} aria-label="Default select example">
                <option selected>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">TransGender</option>
              </select>
            </div>
            <div className="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Mob
              </label>
              <input
                type="number"
                className="form-control"
                onChange={(e)=>setPhone(e.target.value)}
                id="Mob"
                placeholder="Enter mob. no...."
              />
            </div>
            <div className="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password" onChange={(e)=>setPassword(e.target.value)}
                className="form-control"
                id="Password"
                placeholder="Enter Password..."
              />
            </div>




            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Status
              </label>
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Status</option>
                <option value="Male">Pending</option>
                <option value="Female">Activate</option>
                <option value="Transgender">Deactivate</option>
              </select>
            </div>

             <div class="mb-1">
  <label for="exampleFormControlInput1" class="form-label">Date</label>
  <input type="Date" class="form-control" id="Date" placeholder="Choose Date..."/>
</div> 
            <div class="mb-0 mt-2">
              <button type="submit" class="btn btn-success">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
