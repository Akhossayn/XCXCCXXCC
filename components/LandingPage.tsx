
import React from 'react';
import { Play, ShieldCheck, Zap, Activity } from 'lucide-react';

interface LandingPageProps {
  onBegin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBegin }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 text-center space-y-8 p-6 max-w-2xl">
        {/* Logo / Title */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-convergence" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
              <Zap className="w-8 h-8 text-convergence" />
           </div>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 font-mono">
             DIVERGENCE
           </h1>
           <p className="text-sm md:text-base text-zinc-400 font-mono tracking-widest uppercase">
             Institutional Convergence Terminal v2.4
           </p>
        </div>

        {/* System Status Grid */}
        <div className="grid grid-cols-3 gap-4 border-y border-zinc-800 py-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
           <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] text-zinc-500 uppercase">Risk Guard</span>
              <span className="text-xs font-bold text-white">ONLINE</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Activity className="w-5 h-5 text-tier2" />
              <span className="text-[10px] text-zinc-500 uppercase">Data Feeds</span>
              <span className="text-xs font-bold text-white">SYNCED (4ms)</span>
           </div>
           <div className="flex flex-col items-center gap-2">
              <Zap className="w-5 h-5 text-omega" />
              <span className="text-[10px] text-zinc-500 uppercase">Execution</span>
              <span className="text-xs font-bold text-white">STANDBY</span>
           </div>
        </div>

        {/* BEGIN BUTTON */}
        <div className="animate-in fade-in zoom-in duration-500 delay-500">
            <button 
              onClick={onBegin}
              className="group relative px-12 py-4 bg-white text-black font-black text-lg tracking-widest uppercase rounded hover:bg-zinc-200 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shine"></div>
              <span className="relative flex items-center gap-3">
                 Begin Now <Play className="w-4 h-4 fill-current" />
              </span>
            </button>
            <div className="mt-4 text-[10px] text-zinc-600 font-mono">
               By entering, you accept the protocols of the Alpha-Omega Engine.
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
