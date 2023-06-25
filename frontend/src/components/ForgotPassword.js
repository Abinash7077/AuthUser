// src/components/RegisterForm.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();

 
  const [password, setPassword] = useState("");
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/users/` + id+`/password`, {
       
        password,
      })
      .then((response) => {
        
        // Reset the form
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="register-section container text-left">
            <div class="mb-0">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="Password"
                placeholder="Enter Password..."
              />
            </div>

            <div class="mb-0">
              <button type="submit" class="btn btn-success">
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
