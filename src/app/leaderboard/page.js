'use client';

import Link from 'next/link';

export default function Leaderboard() {
  // Mock Database Array
  const mockUsers = [
    { id: 1, name: 'Alice Smith', department: 'Engineering', score: 5 },
    { id: 2, name: 'Bob Jones', department: 'Marketing', score: 2 },
    { id: 3, name: 'Charlie Brown', department: 'HR', score: 4 },
    { id: 4, name: 'Diana Prince', department: 'Executive', score: 5 },
    { id: 5, name: 'Evan Wright', department: 'Sales', score: 1 },
    { id: 6, name: 'You (Current User)', department: 'Security', score: 2 }, 
  ];

  // Sort the array from highest score to lowest score
  const sortedUsers = [...mockUsers].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-900">Global Leaderboard</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-4 rounded-tl-lg font-semibold">Rank</th>
                <th className="p-4 font-semibold">Employee Name</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 rounded-tr-lg font-semibold text-center">Modules Completed</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b last:border-b-0 hover:bg-slate-50 transition ${
                    user.name.includes('You') ? 'bg-blue-50 font-semibold' : ''
                  }`}
                >
                  <td className="p-4 text-slate-500 font-bold">
                    #{index + 1}
                    {index === 0 && ' 🥇'}
                    {index === 1 && ' 🥈'}
                    {index === 2 && ' 🥉'}
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.department}</td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-bold">
                      {user.score} / 5
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}