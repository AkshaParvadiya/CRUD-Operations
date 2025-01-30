import React, { useState } from 'react';
import Navbar from './Navbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  Button,
  TableRow,
  styled,
} from '@mui/material';
import { getUser, DeleteUserData } from '../service/api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Tablestyle = styled(Table)`
  width: 90%;
  margin: 50px auto 0 auto;
`;

const Tbhead = styled(TableRow)`
  background: #9a0244;
  & > th {
    color: #fff;
    font-size: 19px;
  }
`;

const Tbodyhead = styled(TableRow)`
  & > td {
    color: #000;
    font-size: 16px;
  }
`;

const ListUserData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUserDetails();
  }, []);

  const DeleteUser = async (id) => {
    await DeleteUserData(id);
    getUserDetails();
  };

  const getUserDetails = async () => {
    let response = await getUser();
    console.log(response);
    setUsers(response.data);
  };
  return (
    <div>
      
      <Tablestyle>
        <TableHead>
          <Tbhead>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>EmailAddress</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Actions</TableCell>
          </Tbhead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Tbodyhead>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.emailAddress}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.dateOfBirth}</TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  style={{ marginRight: 12 }}
                  component={Link}
                  to={`/EditUser/${user.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => DeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </Tbodyhead>
          ))}
        </TableBody>
      </Tablestyle>
    </div>
  );
};

export default ListUserData;
