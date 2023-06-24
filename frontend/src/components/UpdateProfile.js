// src/components/RegisterForm.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
    const navigate=useNavigate()



  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[mob,setMob]=useState("")
  const[gender,setGender]=useState("")
  const[password,setPassword]=useState("")
const {id}=useParams()

  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/users/`+id, {name,email,mob,gender,password})
      .then((response) => {
        console.log(response.data);
        // Reset the form
navigate('/')
        
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
   

   <div className="container">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="register-section container text-left">
            <div class="mb-0 ">
              <label for="exampleFormControlInput1" class="form-label">
                User ID
              </label>
              <input
                type="text"
               
                class="form-control"
                id="UserID"
                placeholder="Enter user id"
              />
            </div>
            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={(e)=>setName(e.target.value)}
                class="form-control"
                id="Name"
                placeholder="Enter name here...."
              />
            </div>
            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                
                id="Email"
              
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter email here...."
              />
            </div>
            <div class="mb-0">
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
            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Mob
              </label>
              <input
                type="number"
                class="form-control"
                onChange={(e)=>setMob(e.target.value)}
                id="Mob"
                placeholder="Enter mob. no...."
              />
            </div>
            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password" onChange={(e)=>setPassword(e.target.value)}
                class="form-control"
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
            <div class="mb-0">
              <button type="submit" class="btn btn-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
