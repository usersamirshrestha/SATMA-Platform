'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [modulesCompleted, setModulesCompleted] = useState(0); // NEW: Tracks progress score

  useEffect(() => {
    const checkSecurityClearance = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
        
        // NEW: Check the browser memory to see if they passed Module 1
        const isModule1Done = localStorage.getItem('satma_module1_done');
        if (isModule1Done === 'true') {
          setModulesCompleted(1); 
        }
      }
    };

    checkSecurityClearance();
  }, [router]);

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-900">
        <p className="text-xl font-semibold animate-pulse">Checking security clearance...</p>
      </main>
    );
  }

  // Calculate the percentage for the bar (e.g., 1 out of 5 is 20%)
  const progressPercentage = (modulesCompleted / 5) * 100;

  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Updated Progress Card */}
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
          {modulesCompleted === 0 ? (
            <>
              <p className="mb-4">You have a pending quiz on "Phishing Awareness".</p>
              <Link 
                href="/phishing" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Take Quiz
              </Link>
            </>
          ) : (
             <p className="mb-4 text-green-600 font-semibold">You are all caught up for now! Great job.</p>
          )}
        </div>
      </div>
    </main>
  );
}