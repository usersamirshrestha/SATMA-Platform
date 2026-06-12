'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [modulesCompleted, setModulesCompleted] = useState(0);

  // This function reads the progress from browser memory
  const loadProgress = () => {
    let count = 0;
    if (localStorage.getItem('satma_module1_done') === 'true') count++;
    if (localStorage.getItem('satma_module2_done') === 'true') count++;
    setModulesCompleted(count);
  };

  useEffect(() => {
    const checkSecurityClearance = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
        loadProgress(); // Load the data when authorized
      }
    };

    checkSecurityClearance();
  }, [router]);

  // NEW: This clears the tracking keys and sets the visual state back to 0
  const handleReset = () => {
    localStorage.removeItem('satma_module1_done');
    localStorage.removeItem('satma_module2_done');
    setModulesCompleted(0); // Instantly updates the progress bar on screen!
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-900">
        <p className="text-xl font-semibold animate-pulse">Checking security clearance...</p>
      </main>
    );
  }

  const progressPercentage = (modulesCompleted / 5) * 100;

  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">My Progress</h2>
            <p>Training Modules Completed: {modulesCompleted} / 5</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 overflow-hidden">
              <div 
                className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
            
            {modulesCompleted === 0 && (
              <>
                <p className="mb-4">You have a pending quiz on <strong>"Phishing Awareness"</strong>.</p>
                <Link 
                  href="/phishing" 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Take Quiz
                </Link>
              </>
            )}

            {modulesCompleted === 1 && (
              <>
                <p className="mb-4">You have a pending tool test on <strong>"Password Security"</strong>.</p>
                <Link 
                  href="/password-security" 
                  className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                >
                  Test Passwords
                </Link>
              </>
            )}

            {modulesCompleted >= 2 && (
              <p className="mb-4 text-green-600 font-semibold">🎉 You are completely caught up on your security training today!</p>
            )}
          </div>
        </div>
      </div>

      {/* Developer Tool Section at the bottom */}
      <div className="mt-auto pt-6 border-t border-slate-300 flex justify-end">
        <button
          onClick={handleReset}
          className="text-xs bg-slate-300 hover:bg-red-200 hover:text-red-700 text-slate-600 px-3 py-1.5 rounded transition font-mono"
        >
          [Dev Tool: Reset Progress]
        </button>
      </div>
    </main>
  );
}