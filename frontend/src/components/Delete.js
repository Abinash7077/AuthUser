

import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Delete = ({id}) => {
    console.log(id)
  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3000/users/${id}`)
      .then((response) => {
        console.log(response.data);
        // Perform any additional actions after account deletion
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
  );
};

export default Delete;
