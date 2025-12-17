
import React from 'react';

const ConvergenceVisualizer: React.FC<{ score?: number }> = ({ score = 85 }) => {
  // Map score to animation speeds/intensities
  const pulseSpeed = score > 80 ? 'animate-pulse' : score < 40 ? 'animate-pulse-slow' : 'animate-pulse';
  
  return (
    <div className="h-[200px] relative flex items-center justify-center my-6 bg-zinc-900/30 rounded border border-dashed border-zinc-800 overflow-hidden">
      
      {/* Background Orbitals */}
      <div className="absolute w-[240px] h-[240px] rounded-full border border-zinc-800/50 animate-spin-slow"></div>
      
      {/* Alpha Field (Green) */}
      <div className={`absolute w-[140px] h-[140px] rounded-full border-2 border-alpha/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] ${pulseSpeed}`}></div>
      
      {/* Omega Field (Orange) */}
      <div className="absolute w-[100px] h-[100px] rounded-full border-2 border-omega/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-ping" style={{ animationDuration: score > 80 ? '2s' : '4s' }}></div>

      {/* The Core Convergence (Purple) */}
      <div className="relative z-10 w-[60px] h-[60px] rounded-full bg-black border-2 border-convergence shadow-[0_0_50px_rgba(139,92,246,0.5)] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-convergence/20 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-bold text-convergence relative z-10">TIER {score > 80 ? '1' : score > 50 ? '2' : '3'}</span>
        <span className="text-[8px] text-white/50 relative z-10 font-mono">LOCK</span>
      </div>

      {/* Connecting Lines (Visualization of Alignment) */}
      <div className={`absolute w-full h-px bg-gradient-to-r from-transparent via-alpha/50 to-transparent transform rotate-45 transition-opacity duration-500 ${score > 60 ? 'opacity-100' : 'opacity-20'}`}></div>
      <div className={`absolute w-full h-px bg-gradient-to-r from-transparent via-omega/50 to-transparent transform -rotate-45 transition-opacity duration-500 ${score < 40 || score > 80 ? 'opacity-100' : 'opacity-20'}`}></div>

    </div>
  );
};

export default ConvergenceVisualizer;
