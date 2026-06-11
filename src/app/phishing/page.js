'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PhishingModule() {
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (answer) => {
    if (answer === 'bad') {
      setIsCorrect(true);
      
      // NEW LINE: This saves your victory to the browser's local memory!
      localStorage.setItem('satma_module1_done', 'true'); 
      
      setFeedback('Correct! The email creates a false sense of urgency and contains a suspicious link. Always verify with the IT department directly.');
    } else {
      setIsCorrect(false);
      setFeedback('Incorrect. Notice how the email threatens to delete your account in 24 hours? That is a classic phishing tactic creating false urgency.');
    }
  };

  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-900">Module 1: Phishing Awareness</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Lesson Section */}
        <h2 className="text-xl font-semibold mb-3">What is Phishing?</h2>
        <p className="mb-6 text-slate-700 leading-relaxed">
          Phishing is a type of social engineering attack often used to steal user data, including login credentials and credit card numbers. It occurs when an attacker, masquerading as a trusted entity, dupes a victim into opening an email, instant message, or text message.
        </p>

        {/* Interactive Quiz Section */}
        <div className="bg-slate-50 p-6 rounded border border-slate-200 mt-8">
          <h3 className="text-lg font-bold mb-4">Pop Quiz!</h3>
          <p className="mb-4">You receive an email from <strong>"IT-Support@satma-security.net"</strong> that says:</p>
          
          <blockquote className="border-l-4 border-red-500 pl-4 italic mb-6 text-slate-600 bg-white p-3 shadow-sm">
            "URGENT: Your password expires in 2 hours. Click here [www.satma-security-update.com] to reset it now or your account will be permanently deleted."
          </blockquote>
          
          <p className="font-semibold mb-3">What should you do?</p>
          
          {/* Quiz Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleAnswer('bad')}
              className="w-full text-left p-3 rounded border border-slate-300 hover:bg-blue-50 transition"
            >
              A) Do not click the link. Report it to your actual IT department.
            </button>
            <button 
              onClick={() => handleAnswer('good')}
              className="w-full text-left p-3 rounded border border-slate-300 hover:bg-blue-50 transition"
            >
              B) Click the link immediately so you don't lose your account.
            </button>
          </div>

          {/* Feedback Display */}
          {feedback && (
            <div className={`mt-6 p-4 rounded font-medium ${isCorrect ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
              {feedback}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}