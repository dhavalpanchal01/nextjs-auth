'use client';

import React, { useState, useEffect } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";



const LoginForm: React.FC = () => {

  const router = useRouter();

  const [user, setsUser] = useState({
    email: '',
    password: ''
  })

  const [btnDisabled, setBtnDisabled] = useState(true)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allFieldsFilled = user.email && user.password;
    setBtnDisabled(!allFieldsFilled);
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log('login success', res.data);
      router.push('/profile');
      toast.success('login successful', res.data.message);
    } catch (error: any) {
      toast.error(`${error.response.data.error}`)
      console.log('login failed', error)
    } finally {
      setLoading(false);
    }
  }


  return (
    <>

      {loading ? <Loader /> :
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-600">Login Here!</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="email" className="text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setsUser({ ...user, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
                  placeholder="Enter your email"
                  autoComplete="off"
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
                  onChange={(e) => setsUser({ ...user, password: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
                  placeholder="Enter your password"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
                disabled={btnDisabled}
              >
                Login
              </button>
              <p className="mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-500 font-semibold hover:underline"
                >
                  Sign up
                </Link>{" "}
                instead.
              </p>
            </form>
          </div>
        </div>}
      <Toaster />
    </>
  );
};

export default LoginForm;