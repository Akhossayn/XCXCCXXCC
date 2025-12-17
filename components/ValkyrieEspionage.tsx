
import React from 'react';
import { Radar, Lock, Zap, Server, GitCommit } from 'lucide-react';
import { TowerData } from '../types';

interface ValkyrieProps {
    towers: TowerData[];
    syncIndex: number;
    trapRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    genProb: number;
}

const ValkyrieEspionage: React.FC<ValkyrieProps> = ({ towers, syncIndex, trapRisk, genProb }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Radar className="w-5 h-5 text-primary" />
            VALKYRIE ESPIONAGE PROTOCOL
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-mono">CROSS-TOWER CORRELATION // ENTRAPMENT DECRYPTION</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase">Tower Sync Index</div>
                <div className={`font-mono font-bold text-lg ${syncIndex > 90 ? 'text-emerald-500' : 'text-omega'}`}>
                    {syncIndex.toFixed(1)}%
                </div>
            </div>
            <div className="text-right border-l border-zinc-800 pl-4">
                <div className="text-[10px] text-zinc-500 uppercase">Trap Probability</div>
                <div className={`font-mono font-bold text-lg ${trapRisk === 'HIGH' ? 'text-danger' : trapRisk === 'MEDIUM' ? 'text-omega' : 'text-emerald-500'}`}>
                    {trapRisk}
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* THE MONOLITHS (Tower Alignment Visualizer) */}
        <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Server className="w-32 h-32" />
            </div>
            <h3 className="font-bold text-text-primary flex items-center gap-2 mb-8 relative z-10">
                <Server className="w-4 h-4 text-tier2" />
                MONOLITH TOWER ALIGNMENT
            </h3>

            <div className="flex justify-around items-end h-56 gap-6 relative z-10 px-4">
                {towers.map((tower, i) => (
                    <div key={i} className="flex flex-col items-center w-full group relative">
                        {/* Data Tag */}
                        <div className={`mb-3 text-center transition-all duration-300 transform group-hover:-translate-y-1`}>
                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">CVD</div>
                            <div className={`text-sm font-mono font-bold ${
                                tower.cvd.startsWith('+') ? 'text-emerald-500' : 
                                tower.cvd.startsWith('-') ? 'text-omega' : 'text-zinc-400'
                            }`}>
                                {tower.cvd}
                            </div>
                            <div className={`text-[8px] mt-0.5 border rounded px-1.5 py-px inline-block bg-black/40 ${
                                tower.status === 'SYNCED' ? 'text-emerald-500 border-emerald-900' : 'text-rose-500 border-rose-900'
                            }`}>
                                {tower.status}
                            </div>
                        </div>

                        {/* The Monolith Pillar */}
                        <div className="relative w-full flex-1 flex items-end justify-center group-hover:opacity-100 transition-opacity">
                            <div 
                                className={`w-10 rounded-t-sm transition-all duration-500 ease-out border-t-2 relative overflow-hidden ${
                                    tower.name === 'HYPERLIQUID' 
                                    ? 'bg-gradient-to-t from-amber-900/20 to-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                                    : tower.cvd.startsWith('-')
                                        ? 'bg-gradient-to-t from-zinc-900/40 to-zinc-500/10 border-zinc-500'
                                        : 'bg-gradient-to-t from-emerald-900/20 to-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                                }`}
                                style={{ height: `${tower.align}%` }}
                            >
                                {/* Scanline effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-full w-full animate-scan"></div>
                            </div>
                        </div>
                        
                        {/* Base Label */}
                        <div className="mt-3 text-center border-t border-zinc-800 w-full pt-2">
                            <div className="text-[10px] font-black text-zinc-400 tracking-wider">{tower.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Consensus Bar */}
            <div className="mt-8 bg-zinc-900/60 border border-zinc-800 p-3 rounded flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <GitCommit className="w-4 h-4 text-tier2" />
                    <span className="text-xs text-zinc-400 font-mono">
                        Consensus Logic: <span className="text-white font-bold tracking-wide">
                            {towers.filter(t => t.bias === 'LONG').length} / {towers.length} TOWERS LONG BIASED
                        </span>
                    </span>
                </div>
            </div>
        </div>

        {/* ENTRAPMENT RISK & FUSION */}
        <div className="space-y-6 flex flex-col">
            
            {/* Trap Detector */}
            <div className="bg-bg-card rounded-lg border border-zinc-800 p-6 relative overflow-hidden flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        ENTRAPMENT RISK
                    </h3>
                </div>

                {/* Central Visualization */}
                <div className="relative flex-1 flex items-center justify-center min-h-[160px]">
                     {/* Radar Rings */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-40 h-40 rounded-full border border-zinc-800/60"></div>
                        <div className="w-28 h-28 rounded-full border border-zinc-800/80"></div>
                        <div className={`w-20 h-20 rounded-full animate-pulse transition-colors duration-500 ${
                            trapRisk === 'HIGH' ? 'bg-rose-500/10' : trapRisk === 'MEDIUM' ? 'bg-omega/10' : 'bg-emerald-500/5'
                        }`}></div>
                     </div>
                     
                     <div className="text-center relative z-10">
                        <div className={`text-4xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-colors duration-500 ${
                            trapRisk === 'HIGH' ? 'text-rose-500' : trapRisk === 'MEDIUM' ? 'text-omega' : 'text-emerald-500'
                        }`}>
                            {trapRisk}
                        </div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-2 font-bold">Calculated Probability</div>
                        <div className="text-[10px] text-convergence font-mono mt-1 font-bold">GEN PROB: {genProb.toFixed(1)}%</div>
                     </div>
                </div>

                {/* Bottom Metrics */}
                <div className="flex justify-between items-end pt-4 mt-2 border-t border-zinc-800/50 relative z-10">
                    <div>
                        <div className="text-[9px] text-zinc-500 uppercase mb-0.5">Spot Delta</div>
                        <div className="text-sm font-mono font-bold text-white">+450 BTC</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] text-zinc-500 uppercase mb-0.5">Perp Delta</div>
                        <div className="text-sm font-mono font-bold text-rose-500">-1,200 BTC</div>
                    </div>
                </div>
            </div>

            {/* Fusion Action */}
            <div className="bg-zinc-900 border border-primary/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-primary">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Tactical Recommendation</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {trapRisk === 'HIGH' 
                        ? "CRITICAL TRAP DETECTED. Spot selling into Perp buying. LIQUIDATE LONGS." 
                        : trapRisk === 'MEDIUM'
                        ? "Potential absorption. Spot buying vs Perp selling. Wait for confirmation."
                        : "Clear sky. Spot and Perps aligned. Accumulation zone."
                    }
                </p>
                <div className="flex gap-2">
                    <div className="flex-1 bg-black/50 border border-zinc-800 rounded p-2 text-center">
                        <div className="text-[9px] text-zinc-500">ACTION</div>
                        <div className="text-xs font-bold text-white">
                             {trapRisk === 'HIGH' ? 'EXIT NOW' : trapRisk === 'MEDIUM' ? 'HEDGE' : 'LONG'}
                        </div>
                    </div>
                     <div className="flex-1 bg-black/50 border border-zinc-800 rounded p-2 text-center">
                        <div className="text-[9px] text-zinc-500">CONFIDENCE</div>
                        <div className="text-xs font-bold text-tier2">{genProb}%</div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ValkyrieEspionage;
