'use client'; 

import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation'; // <-- We added the Next.js router

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // <-- We activate the router here

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) setMessage(error.message);
    else setMessage('Success! You can now sign in.');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Logging you in...');
      router.push('/dashboard'); // <-- This instantly teleports the user to the dashboard!
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-slate-900">
        <h1 className="text-2xl font-bold mb-6 text-center">SATMA Platform Login</h1>
        
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          
          {message && <p className="text-center text-sm font-semibold text-blue-600">{message}</p>}

          <div className="flex gap-4 mt-2">
            <button
              onClick={handleLogin}
              className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="flex-1 bg-slate-200 text-slate-900 p-3 rounded hover:bg-slate-300 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}