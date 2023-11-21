'use client';
import Loader from '@/components/Loader';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';



// SignUpForm.tsx
const SignUpForm: React.FC = () => {

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post('/api/users/signup', user);
      console.log('signup success', res.data);
      router.push('/login')
      toast.success(res.data.message)

    } catch (error: any) {

      toast.error(error.message);
      console.log('failed to signup', error.message);

    } finally {

      setLoading(false);

    }


  };

  useEffect(() => {
    const allFieldsFilled = user.username && user.email && user.password;
    setBtnDisabled(!allFieldsFilled);
  }, [user])


  return (<>

    
    {loading ? 
    <Loader />
    :
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-500">Sign Up Here!</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
              placeholder="Enter your username"
              autoComplete='off'
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
              placeholder="Enter your email"
              autoComplete='off'
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
              placeholder="Enter your password"
              autoComplete='off'
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
            disabled={btnDisabled}
          >
            Sign Up
          </button>
          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-500 font-semibold hover:underline"
            >
              Login
            </Link>{" "}
            instead.
          </p>
        </form>
      </div>
    </div>}
  </>
  );
};

export default SignUpForm;
