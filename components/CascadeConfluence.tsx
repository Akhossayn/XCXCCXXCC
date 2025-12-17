
import React from 'react';
import { GitMerge, Zap, TrendingDown } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Mock data for the "Generation" curve
// This visualizes the exponential pressure build-up
const generationData = Array.from({ length: 20 }, (_, i) => ({
    step: i,
    pressure: Math.pow(i, 2.5) + Math.random() * 20, // Exponential buildup curve
}));

const CascadeConfluence: React.FC<{
    lqScore: number;
    obiScore: number;
    pressureScore: number;
}> = ({ lqScore, obiScore, pressureScore }) => {
    // DERIVATION LOGIC:
    // Cascade Probability is a function of Liquidation Clusters (Fuel) and Order Book Thinness (Lack of friction)
    const cascadeProbability = ((lqScore * 0.5) + (obiScore * 0.3) + (pressureScore * 0.2)) * 100;
    
    // Determine Phase based on probability
    let phase = 'ACCUMULATION';
    let phaseColor = 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
    
    if (cascadeProbability > 60) {
        phase = 'PRIMING';
        phaseColor = 'text-amber-500 border-amber-500/30 bg-amber-500/10';
    }
    if (cascadeProbability > 85) {
        phase = 'CASCADING';
        phaseColor = 'text-danger border-danger/30 bg-danger/10 animate-pulse';
    }
    
    return (
        <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-0 overflow-hidden flex flex-col h-full shadow-lg">
            {/* Header */}
            <div className="p-3 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <GitMerge className="w-4 h-4 text-convergence" />
                    <h2 className="text-xs font-bold text-text-primary uppercase tracking-widest">
                        Predictive Cascade Generator
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-text-secondary">LOGIC:</span>
                    <span className="text-convergence font-bold">VORTEX-4</span>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                {/* LEFT: THE GENERATOR PIPELINE */}
                <div className="p-5 border-r border-zinc-800 relative bg-gradient-to-br from-zinc-900/20 to-transparent">
                    {/* Phase Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        <div className={`px-2 py-1 rounded text-[9px] font-bold border ${phaseColor}`}>
                            {phase}
                        </div>
                    </div>
                    
                    {/* The "Pipeline" Visual */}
                    <div className="space-y-6 mt-2 relative z-0">
                         {/* Input 1: FUEL */}
                         <div className="relative">
                            <div className="flex justify-between text-[9px] text-text-secondary mb-1 uppercase tracking-wider">
                                <span>Leverage Fuel (LQ)</span>
                                <span>{(lqScore * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-alpha transition-all duration-1000 ease-out" style={{ width: `${lqScore * 100}%` }}></div>
                            </div>
                         </div>
                         
                         {/* Logic Connection Line */}
                         <div className="absolute left-1/2 -translate-x-1/2 top-5 h-5 w-px bg-zinc-700"></div>

                         {/* Input 2: FRICTION */}
                         <div className="relative pt-4">
                            <div className="flex justify-between text-[9px] text-text-secondary mb-1 uppercase tracking-wider">
                                <span>Book Fragility (OBI)</span>
                                <span>{(obiScore * 100).toFixed(0)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-omega transition-all duration-1000 ease-out" style={{ width: `${obiScore * 100}%` }}></div>
                            </div>
                         </div>

                         {/* Logic Connection Line */}
                         <div className="absolute left-1/2 -translate-x-1/2 top-[4.5rem] h-5 w-px bg-zinc-700"></div>

                         {/* OUTPUT: GENERATED PROBABILITY */}
                         <div className="relative pt-4">
                            <div className="text-center mb-1">
                                <div className="text-4xl font-black text-white font-mono tracking-tighter leading-none">
                                    {cascadeProbability.toFixed(1)}<span className="text-lg text-zinc-600">%</span>
                                </div>
                                <div className="text-[9px] text-convergence uppercase font-bold tracking-widest mt-1">Generation Probability</div>
                            </div>
                            
                            {/* Dynamic Generator Graph */}
                            <div className="h-12 w-full opacity-60 mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={generationData}>
                                        <defs>
                                            <linearGradient id="genGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area 
                                            type="monotone" 
                                            dataKey="pressure" 
                                            stroke="#8b5cf6" 
                                            strokeWidth={2}
                                            fill="url(#genGrad)" 
                                            isAnimationActive={true} 
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                         </div>
                    </div>
                </div>

                {/* RIGHT: PREDICTIVE IMPACT MODEL */}
                <div className="p-5 flex flex-col justify-between bg-[#0c0c0e]">
                     <div>
                        <div className="text-[10px] font-bold text-text-muted mb-4 flex items-center gap-2 uppercase tracking-wider">
                            <Zap className="w-3 h-3 text-omega" />
                            Predicted Sequence
                        </div>
                        
                        <div className="space-y-4 relative pl-1">
                            {/* Sequence Line */}
                            <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-zinc-800"></div>

                            {/* Node 1: Trigger */}
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-zinc-900 border-2 border-zinc-600 z-10"></div>
                                <div className="text-[9px] text-zinc-500 font-mono mb-0.5">TRIGGER PRICE</div>
                                <div className="text-sm font-bold text-white">$97,850.00</div>
                            </div>

                             {/* Node 2: Slippage */}
                             <div className="relative pl-6">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-zinc-900 border-2 border-tier2 z-10"></div>
                                <div className="text-[9px] text-zinc-500 font-mono mb-0.5">EST. SLIPPAGE</div>
                                <div className="text-sm font-bold text-tier2">-1.2% (Instant)</div>
                            </div>

                             {/* Node 3: Target */}
                             <div className="relative pl-6">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-zinc-900 border-2 border-danger z-10 animate-pulse"></div>
                                <div className="text-[9px] text-zinc-500 font-mono mb-0.5">WICK TARGET</div>
                                <div className="text-sm font-bold text-danger">$96,100</div>
                            </div>
                        </div>
                     </div>

                     {/* Model Confidence */}
                     <div className="mt-4 pt-4 border-t border-zinc-800/50">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                             <div className="text-text-secondary flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" /> Model Confidence
                             </div>
                             <div className="font-mono text-white font-bold">88%</div>
                        </div>
                        <div className="w-full bg-zinc-800 h-1 rounded-full"><div className="bg-convergence h-full w-[88%] shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div></div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CascadeConfluence;
