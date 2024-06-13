'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectForm from './parts/SubjectForm';
import Table from '../Table/Table';
import { useRouter } from 'next/navigation';
import { getSubjects } from '@/src/services/SubjectService/subject';
const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const router = useRouter()
  useEffect(() => {
    fetchSubjects();
  }, []);


  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data.response);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
  };


  const handleSubjectFormSuccess = () => {
    fetchSubjects();
    setEditingSubject(null);
  };

  return (
    <> {sessionStorage.getItem('user') ?
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Subject Management System</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{editingSubject ? 'Edit Subject' : 'Add Subject'}</h2>
        <SubjectForm subject={editingSubject} onSuccess={handleSubjectFormSuccess} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Subjects</h2>
        <Table data={subjects} onDelete={handleDeleteSubject} onEdit={handleEditSubject} />
      </div>
    </div>
    :
    router.push('/')

}</>
  );
};

export default Subject;