import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Delete from './Delete';
import { NavLink } from 'react-router-dom';
const UserList = () => {
    const navigate=useNavigate()
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [records,setRecords]=useState([])

  useEffect(() => {
    fetchUsers();
  }, [page, limit, sortField, sortOrder, search]);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users', {
      
    })
      .then((response) => {
        const { data, total, page, limit } = response.data;
        setUsers(data);
        setTotal(total);
        setPage(page);
        setLimit(limit);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [field, order] = value.split('_');
    setSortField(field);
    setSortOrder(order);
  };

  const handleSearchChange = (e) => {
 setSearch(e.target.value)
    setPage(1);

  };
const handleDelete=(e)=>{
    e.preventDefault()
    navigate("/Delete")
}
  return (
    <>
    <div className="container">
      <div className="mb-3 container">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              Name{' '}
             
            </th>
            <th>Email</th>
            <th>Password </th>
            <th>Update Password / Edit /Delete</th>
            {/* Add other table headers here */}
          </tr>
        </thead>
        <tbody>
          {users
          .map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
              <span className='mx-2'>
              <NavLink to={`/ForgotPassword/${user.id}/password`} className='btn btn-secondary '  >Update Password</NavLink>
              </span>
               
                <NavLink to={`/UpdateProfile/${user.id}`} className='btn btn-primary ' >Edit</NavLink>
                <span className='mx-2'></span>
                <Delete 
                id={user.id}
                />
              </td>
              {/* Add other table cells here */}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        />

        {Array.from({ length: Math.ceil(total / limit) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === page}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={page === Math.ceil(total / limit)}
          onClick={() => handlePageChange(page + 1)}
        />
      </Pagination>
      </div>
    </>
  );
};

export default UserList;