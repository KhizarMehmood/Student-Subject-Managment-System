"use client"; // Ensure this is a client component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/user'); // Automatically navigate to /user
  }, [router]);

  return (
    <div>Redirecting...</div>
  );
};

export default HomePage;

