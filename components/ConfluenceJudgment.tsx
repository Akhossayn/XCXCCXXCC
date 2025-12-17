
import React from 'react';
import { Target, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ConfluenceProps {
    score: number;
    optimalCount: number;
    totalIndicators: number;
}

const ConfluenceJudgment: React.FC<ConfluenceProps> = ({ score, optimalCount, totalIndicators }) => {
    
    let sentiment = 'NEUTRAL';
    let sentimentColor = 'text-white';
    if (score > 70) { sentiment = 'BULLISH'; sentimentColor = 'text-emerald-500'; }
    if (score < 30) { sentiment = 'BEARISH'; sentimentColor = 'text-rose-500'; }

    return (
        <div className="col-span-1 lg:col-span-2 bg-[#0c0c0e] rounded-lg border border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-800/50 pb-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-black text-white uppercase tracking-tighter">CONFLUENCE JUDGMENT</h2>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] text-zinc-500 uppercase">Confidence Score</div>
                         <div className={`text-2xl font-black font-mono ${sentimentColor}`}>
                             {score.toFixed(1)}%
                         </div>
                    </div>
                </div>

                <div className="space-y-4 font-mono text-sm leading-relaxed">
                    <div className="text-zinc-300">
                        Market state is <span className={`${sentimentColor} font-bold`}>{sentiment}</span>. 
                        <span className="text-white font-bold ml-2">{optimalCount} / {totalIndicators}</span> indicators are currently in optimal alignment.
                    </div>
                    
                    <div className="pl-3 border-l-2 border-primary/50">
                        <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Structure</div>
                        {score > 60 
                            ? <span>High probability of continuation. <span className="text-tier2 font-bold">Momentum locked</span>.</span> 
                            : score < 40 
                            ? <span>Structure degrading. <span className="text-omega font-bold">Caution advised</span>.</span>
                            : <span>Chop zone. <span className="text-zinc-500 font-bold">Await clarity</span>.</span>
                        }
                    </div>

                    <div className="space-y-2 mt-4 text-xs font-mono">
                         {/* Dynamic Recommendations based on Score */}
                        <div className={`flex items-center gap-3 bg-zinc-900/50 p-2 rounded border ${score > 60 ? 'border-emerald-500/50' : 'border-zinc-800 opacity-50'}`}>
                            <span className="text-emerald-500 font-bold w-12">LONG</span>
                            <span className="text-zinc-300">{score > 60 ? "Primary bias. Look for pullbacks." : "Low conviction."}</span>
                        </div>
                        <div className={`flex items-center gap-3 bg-zinc-900/50 p-2 rounded border ${score >= 40 && score <= 60 ? 'border-zinc-500/50' : 'border-zinc-800 opacity-50'}`}>
                            <span className="text-zinc-400 font-bold w-12">FLAT</span>
                            <span className="text-zinc-300">
                                {score >= 40 && score <= 60 ? "Preserve capital. Volatility crush likely." : "Secondary option."}
                            </span>
                        </div>
                        <div className={`flex items-center gap-3 bg-zinc-900/50 p-2 rounded border ${score < 40 ? 'border-rose-500/50' : 'border-zinc-800 opacity-50'}`}>
                            <span className="text-rose-500 font-bold w-12">SHORT</span>
                            <span className="text-zinc-300">{score < 40 ? "Fade rallies. Liquidity target below." : "Counter-trend only."}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 relative z-10">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-omega shrink-0" />
                    <div>
                        <div className="text-xs font-bold text-omega uppercase mb-1">WARNING</div>
                        <p className="text-xs text-zinc-400 leading-normal">
                            Don’t let emotion override confluence. The real edge is in the math.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfluenceJudgment;
