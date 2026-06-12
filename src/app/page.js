import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-3xl relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          SATMA Platform
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
          The next generation of Security Awareness Training. 
          Protect your organization by empowering your team to identify and defeat cyber threats.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30"
          >
            Get Started
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-slate-800 text-slate-300 border border-slate-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-slate-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

    </main>
  );
}