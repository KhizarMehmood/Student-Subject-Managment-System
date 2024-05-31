// components/SubjectForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createSubject, updateSubject } from '../../../services/SubjectService/subject';
import { getUsers } from '@/src/services/UserService/user';
const SubjectForm = ({ subject, onSuccess }) => {
  const [name, setName] = useState(subject?.name || '');
  const [userId, setUserId] = useState(subject?.userId || '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data.response);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };
  useEffect(() => {
    if (subject) {
      setName(subject.name);
      setUserId(subject.userId);;
    }
  }, [subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (subject) {
        await updateSubject(subject._id, { name, userId });
      } else {
        await createSubject({ name, userId });
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">User</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {subject ? 'Update Subject' : 'Add Subject'}
      </button>
    </form>
  );
};

export default SubjectForm;
