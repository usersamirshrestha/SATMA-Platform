'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PasswordSecurity() {
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState([]);

  // This function analyzes the password in real-time
  const checkStrength = (pwd) => {
    let score = 0;
    let messages = [];

    if (pwd.length === 0) return { score: 0, messages: [] };

    // Rule 1: Length check
    if (pwd.length >= 8) {
      score++;
    } else {
      messages.push('Make it at least 8 characters long.');
    }

    // Rule 2: Contains a number
    if (/\d/.test(pwd)) {
      score++;
    } else {
      messages.push('Add at least one number.');
    }

    // Rule 3: Contains a mix of uppercase & lowercase
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) {
      score++;
    } else {
      messages.push('Mix in both uppercase and lowercase letters.');
    }

    // Rule 4: Contains a special character
    if (/[!@#$%^&*(),.?":{}|<>_]/.test(pwd)) {
      score++;
    } else {
      messages.push('Add a special character (e.g., !, @, #, $).');
    }

    return { score, messages };
  };

  const { score, messages } = checkStrength(password);

  // Determine bar color and text based on score
  const getStrengthLabel = () => {
    if (password.length === 0) return { label: 'Enter a password', color: 'bg-slate-200', width: '0%' };
    if (score <= 1) return { label: 'Weak ❌', color: 'bg-red-500', width: '25%' };
    if (score <= 3) return { label: 'Medium ⚠️', color: 'bg-yellow-500', width: '60%' };
    return { label: 'Strong 💪', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrengthLabel();

  const handleCompleteModule = () => {
    localStorage.setItem('satma_module2_done', 'true');
    alert('Module 2 Completed! Head back to the dashboard to see your progress update.');
  };

  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-900">Module 2: Password Security</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Lesson */}
        <h2 className="text-xl font-semibold mb-3">The Anatomy of a Strong Password</h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Hackers use automated programs called "brute-force" tools that can guess simple passwords in milliseconds. To protect your identity, passwords should be complex, unpredictable, and at least 8–12 characters long.
        </p>

        {/* Interactive Input Box */}
        <div className="bg-slate-50 p-6 rounded border border-slate-200">
          <label className="block font-semibold mb-2">Test Your Password Strength:</label>
          <input
            type="text"
            placeholder="Type a test password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          />

          {/* Visual Dynamic Strength Bar */}
          <div className="mb-2 flex justify-between items-center font-medium text-sm">
            <span>Strength:</span>
            <span className="font-bold">{strength.label}</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-6">
            <div 
              className={`${strength.color} h-full transition-all duration-300 ease-out`}
              style={{ width: strength.width }}
            ></div>
          </div>

          {/* Real-time Tips List */}
          {messages.length > 0 && password.length > 0 && (
            <div className="bg-blue-50 p-4 rounded border border-blue-200 mb-6">
              <p className="font-semibold text-blue-900 mb-2">Tips to improve:</p>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Module Button */}
          {score === 4 && (
            <button
              onClick={handleCompleteModule}
              className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition animate-bounce mt-4"
            >
              Verify & Complete Module! 🎉
            </button>
          )}
        </div>

      </div>
    </main>
  );
}