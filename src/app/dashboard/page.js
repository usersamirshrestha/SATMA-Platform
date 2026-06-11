export default function Dashboard() {
  return (
    <main className="min-h-screen p-10 bg-slate-100 text-slate-900">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">My Progress</h2>
          <p>Training Modules Completed: 0 / 5</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
          <p className="mb-4">You have a pending quiz on "Phishing Awareness".</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Take Quiz
          </button>
        </div>
      </div>
    </main>
  );
}