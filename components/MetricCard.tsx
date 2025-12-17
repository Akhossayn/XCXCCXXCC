
import React, { useState } from 'react';
import { Area, AreaChart, LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { MetricData } from '../types';
import { RotateCcw, Target, Crosshair, TrendingUp, AlertCircle } from 'lucide-react';

interface MetricCardProps {
  data: MetricData;
}

// --- RPM GAUGE (Minimalist Version) ---
const RPMGauge: React.FC<{ value: number; displayValue: string; color: string }> = ({ value, displayValue, color }) => {
  const normalizedValue = Math.min(Math.max(value, 0), 1);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
       <svg width="100%" height="100%" viewBox="0 0 100 50" className="overflow-visible">
          {/* Track */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#27272a" strokeWidth={4} strokeLinecap="round" />
          {/* Active Arc */}
          <path 
             d="M 10 50 A 40 40 0 0 1 90 50" 
             fill="none" 
             stroke={color} 
             strokeWidth={4} 
             strokeLinecap="round" 
             strokeDasharray={`${Math.PI * 40}`} 
             strokeDashoffset={`${Math.PI * 40 * (1 - normalizedValue)}`}
             className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
       </svg>
       <div className="absolute bottom-0 text-center">
          <span className="text-2xl font-black text-white font-mono tracking-tighter">{displayValue}</span>
       </div>
    </div>
  );
};

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getColor = () => {
      if (data.tag === 'ALP') return '#10b981'; 
      if (data.tag === 'OME') return '#f59e0b'; 
      return '#3b82f6';
  };
  const color = getColor();

  // Mock "Ideal Range" calculation for visualization
  const currentPct = Math.min(Math.max(data.value * 100, 0), 100);
  const idealMin = 40;
  const idealMax = 75;
  const isOptimal = currentPct >= idealMin && currentPct <= idealMax;

  return (
    <div className="relative h-[160px] w-full perspective-1000 group">
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* --- FRONT FACE (DECLUTTERED) --- */}
            <div className="absolute inset-0 backface-hidden bg-[#09090b] rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors flex flex-col p-4 shadow-lg">
                {/* Header: Title + Flip Action */}
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{data.title}</span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                        className="text-zinc-600 hover:text-white transition-colors p-1"
                        title="Flip for Analysis"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Main Content: Value + Chart ONLY */}
                <div className="flex-1 flex flex-col justify-end relative">
                     {data.chartType === 'gauge' ? (
                        <RPMGauge value={data.value} displayValue={data.displayValue} color={color} />
                     ) : (
                        <>
                            <div className="text-2xl font-black text-white font-mono tracking-tighter mb-1 relative z-10">{data.displayValue}</div>
                            <div className="absolute inset-0 top-4 opacity-50">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data.chartData}>
                                        <defs>
                                            <linearGradient id={`grad-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={color} stopOpacity={0.5}/>
                                                <stop offset="100%" stopColor={color} stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#grad-${data.id})`} isAnimationActive={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                     )}
                </div>
            </div>

            {/* --- BACK FACE (STRATEGY RANGES) --- */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#121214] rounded-xl border border-zinc-700 shadow-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-zinc-800">
                    <span className="text-[9px] font-black text-white uppercase flex items-center gap-1">
                        <Target className="w-3 h-3 text-primary" /> STRATEGY CONTEXT
                    </span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                        className="text-zinc-500 hover:text-white"
                    >
                        <RotateCcw className="w-3.5 h-3.5 rotate-180" />
                    </button>
                </div>

                {/* Range Visualization */}
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    
                    {/* Range Bar */}
                    <div>
                        <div className="flex justify-between text-[9px] font-mono text-zinc-500 mb-1">
                            <span>0</span>
                            <span className={isOptimal ? 'text-emerald-500 font-bold' : 'text-zinc-500'}>OPTIMAL ZONE</span>
                            <span>100</span>
                        </div>
                        <div className="h-2 w-full bg-zinc-800 rounded-full relative overflow-hidden">
                            {/* Optimal Zone Marker */}
                            <div 
                                className="absolute top-0 bottom-0 bg-zinc-700/50" 
                                style={{ left: `${idealMin}%`, width: `${idealMax - idealMin}%` }}
                            ></div>
                            {/* Current Value Marker */}
                            <div 
                                className={`absolute top-0 bottom-0 w-1 ${isOptimal ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'} transition-all duration-500`}
                                style={{ left: `${currentPct}%` }}
                            ></div>
                        </div>
                        <div className="mt-1 text-center">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isOptimal ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {isOptimal ? 'IN RANGE' : 'DEVIATION DETECTED'}
                            </span>
                        </div>
                    </div>

                    {/* Trigger Info */}
                    <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800">
                        <div className="flex items-start gap-2">
                             <Crosshair className="w-3 h-3 text-tier2 mt-0.5" />
                             <div>
                                 <div className="text-[9px] text-zinc-500 uppercase font-bold">Strategy Trigger</div>
                                 <div className="text-[10px] text-zinc-300 font-mono leading-tight mt-0.5">
                                     {data.analysis?.trigger || 'Waiting for confirmation...'}
                                 </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  );
};
