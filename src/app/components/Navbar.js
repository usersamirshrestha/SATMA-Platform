'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Tells Supabase to kill the user session
    router.push('/login'); // Teleports the user back to the login screen
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center">
      <Link href="/" className="font-bold text-xl tracking-wider hover:text-blue-400 transition">
        SATMA
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/leaderboard" className="font-medium hover:text-blue-400 transition">
          Leaderboard
        </Link>
        <Link href="/dashboard" className="font-medium hover:text-blue-400 transition">
          Dashboard
        </Link>
        <button 
          onClick={handleLogout} 
          className="bg-slate-700 px-4 py-2 rounded font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}