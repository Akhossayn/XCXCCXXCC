
import React from 'react';
import { Shield, AlertTriangle, PieChart, Activity, Lock } from 'lucide-react';

const RiskManager: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-omega" />
          RISK MANAGEMENT PROTOCOLS
        </h2>
        <p className="text-xs text-text-secondary mt-1 font-mono">POSITION SIZING // DRAWDOWN CONTROL // EXPOSURE LIMITS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Health */}
        <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
            <div className="text-xs font-bold text-zinc-500 uppercase mb-4">Account Health</div>
            <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#27272a" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="8" fill="none" strokeDasharray="351" strokeDashoffset="35" />
                    </svg>
                    <div className="absolute text-center">
                        <div className="text-2xl font-black text-white">92%</div>
                        <div className="text-[10px] text-zinc-500">HEALTH</div>
                    </div>
                </div>
            </div>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Margin Utilized</span>
                    <span className="text-white font-mono">18.4%</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Daily Drawdown</span>
                    <span className="text-emerald-500 font-mono">-0.45%</span>
                </div>
                <div className="flex justify-between pt-1">
                    <span className="text-zinc-400">Max Permitted DD</span>
                    <span className="text-rose-500 font-mono">3.00%</span>
                </div>
            </div>
        </div>

        {/* Active Exposure */}
        <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
             <div className="text-xs font-bold text-zinc-500 uppercase mb-4">Exposure Limits</div>
             <div className="space-y-4">
                 <div>
                     <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-400">BTC Exposure</span>
                         <span className="text-white font-mono">1.2 BTC</span>
                     </div>
                     <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-primary h-full w-[45%]"></div>
                     </div>
                 </div>
                 <div>
                     <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-400">ETH Exposure</span>
                         <span className="text-white font-mono">8.5 ETH</span>
                     </div>
                     <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-tier2 h-full w-[30%]"></div>
                     </div>
                 </div>
                 <div>
                     <div className="flex justify-between text-xs mb-1">
                         <span className="text-zinc-400">Altcoin Beta</span>
                         <span className="text-white font-mono">$12,400</span>
                     </div>
                     <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-omega h-full w-[15%]"></div>
                     </div>
                 </div>
             </div>
             
             <div className="mt-6 p-3 bg-zinc-900/50 rounded border border-zinc-800 flex items-start gap-3">
                 <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                 <div>
                     <div className="text-xs font-bold text-white mb-1">Kill Switch Active</div>
                     <p className="text-[10px] text-zinc-500 leading-tight">
                         System will auto-liquidate positions if aggregate drawdown exceeds 5% within 1 hour.
                     </p>
                 </div>
             </div>
        </div>

        {/* Global Stops */}
        <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
            <div className="text-xs font-bold text-zinc-500 uppercase mb-4">Hard Stop Configuration</div>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800">
                    <div>
                        <div className="text-xs font-bold text-text-primary">Daily Loss Limit</div>
                        <div className="text-[10px] text-text-secondary">Hard lockout until 00:00 UTC</div>
                    </div>
                    <div className="text-right">
                        <div className="font-mono font-bold text-rose-500">$5,000</div>
                        <div className="text-[9px] text-zinc-500">FIXED</div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800">
                    <div>
                        <div className="text-xs font-bold text-text-primary">Max Leverage</div>
                        <div className="text-[10px] text-text-secondary">Across all venues</div>
                    </div>
                    <div className="text-right">
                        <div className="font-mono font-bold text-tier2">10x</div>
                        <div className="text-[9px] text-zinc-500">CAPPED</div>
                    </div>
                </div>
                
                <button className="w-full py-2 bg-rose-900/20 border border-rose-900 text-rose-500 text-xs font-bold rounded hover:bg-rose-900/40 transition-colors flex items-center justify-center gap-2 mt-2">
                    <AlertTriangle className="w-3 h-3" /> FLATTEN ALL POSITIONS
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManager;
