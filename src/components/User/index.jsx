'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import UserForm from './parts/UserForm';
import Table from '../Table/Table';
import Link from 'next/link'; 
import { getUsers } from '@/src/services/UserService/user';
import { deleteUser } from '@/src/services/UserService/user';
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data.response);
  };

  const handleDeleteUser = async (userId) => {
    console.log(userId);
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };



  const handleEditUser = (user) => {
    setEditingUser(user);
  };



  const handleUserFormSuccess = () => {
    fetchUsers();
    setEditingUser(null);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Subject Management System</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{editingUser ? 'Edit User' : 'Add User'}</h2>
        <UserForm user={editingUser} onSuccess={handleUserFormSuccess} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <Link className="text-sm font-semibold text-blue-700 underline mb-4" href="/subject">Go to add Subjects</Link>
        <Table data={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
      </div>

    </div>
  );
};

export default UserTable;