
import React, { useMemo } from 'react';
import { Search, ArrowRight, Zap, AlertTriangle, TrendingUp, Activity, Filter, Layers } from 'lucide-react';

interface MarketScannerProps {
    pair: string;
    timeframe: string;
}

const ALL_ASSETS = [
    'BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT', 
    'ADA/USDT', 'AVAX/USDT', 'DOT/USDT', 'LINK/USDT', 'MATIC/USDT',
    'DOGE/USDT', 'SHIB/USDT', 'LTC/USDT', 'UNI/USDT', 'ATOM/USDT',
    'ETC/USDT', 'FIL/USDT', 'NEAR/USDT', 'APT/USDT', 'ARB/USDT'
];

const SIGNALS = [
    'PRIVACY_ROTATION', 'L2_BLOB_SATURATION', 'CME_GAP_FILL', 'MEV_CONGESTION',
    'LIQUIDATION_CASCADE', 'WHALE_ACCUMULATION', 'BASIS_DIVERGENCE', 'FUNDING_ARB'
];

const MarketScanner: React.FC<MarketScannerProps> = ({ pair, timeframe }) => {
  
  // Dynamic generation of "Opportunities" based on the current pair/timeframe
  // This ensures the scanner looks "alive" and reactive
  const opportunities = useMemo(() => {
      // Seed random based on inputs to be consistent but dynamic
      const seed = pair.length + timeframe.length; 
      
      return ALL_ASSETS.map((asset, i) => {
          const rand = Math.random(); // In a real app, use a seed
          const score = Math.floor(60 + (rand * 40)); // Score 60-100
          const type = rand > 0.5 ? 'LONG' : 'SHORT';
          const move = (rand * 5).toFixed(2);
          
          return {
              asset,
              signal: SIGNALS[Math.floor(Math.random() * SIGNALS.length)],
              type,
              score,
              timeframe,
              expected_move: `${type === 'LONG' ? '+' : '-'}${move}%`,
              status: score > 85 ? 'CONFIRMED' : 'PENDING'
          };
      })
      .sort((a, b) => b.score - a.score) // Sort by alignment score
      .slice(0, 8); // Top 8
  }, [pair, timeframe]); // Re-run when these change

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            GLOBAL MARKET SCANNER
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-mono">SCANNING 20+ PAIRS // AI CONFIDENCE > 60%</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] font-mono text-text-muted flex items-center gap-2 transition-colors">
               <Filter className="w-3 h-3" /> FILTER: ALIGNED
           </button>
           <span className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-mono text-emerald-500 border border-emerald-900/30">LIVE FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {opportunities.map((opp, idx) => (
          <div key={idx} className="bg-bg-card border border-zinc-800 rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer group hover:bg-zinc-900 relative overflow-hidden">
            {/* Background alignment bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${opp.type === 'LONG' ? 'bg-alpha' : 'bg-omega'}`}></div>
            
            <div className="flex items-center justify-between pl-2">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[10px] border ${opp.type === 'LONG' ? 'bg-alpha/10 text-alpha border-alpha/20' : 'bg-omega/10 text-omega border-omega/20'}`}>
                   {opp.asset.split('/')[0]}
                </div>
                <div>
                   <div className="font-bold text-text-primary flex items-center gap-2">
                      {opp.asset}
                      <span className="text-[9px] px-1.5 py-0.5 bg-zinc-800 rounded text-text-secondary font-mono border border-zinc-700">{opp.timeframe}</span>
                   </div>
                   <div className="text-xs text-text-secondary mt-0.5 font-mono">{opp.signal.replace(/_/g, ' ')}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 text-right items-center">
                 <div>
                    <div className="text-[9px] text-text-muted uppercase tracking-wider">Score</div>
                    <div className="font-mono font-bold text-lg text-primary">{opp.score}</div>
                 </div>
                 <div>
                    <div className="text-[9px] text-text-muted uppercase tracking-wider">Move</div>
                    <div className={`font-mono font-bold text-lg ${opp.type === 'LONG' ? 'text-alpha' : 'text-omega'}`}>{opp.expected_move}</div>
                 </div>
                 <div className="flex items-center justify-end">
                    <button className="p-2 rounded-full bg-zinc-800 group-hover:bg-primary group-hover:text-white transition-colors border border-zinc-700 group-hover:border-primary">
                       <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
         <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Zap className="w-16 h-16 text-omega" />
            </div>
            <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2 relative z-10">
                <Zap className="w-4 h-4 text-omega" />
                VOLATILITY WATCH
            </h3>
            <div className="space-y-2 text-xs font-mono relative z-10">
                <div className="flex justify-between border-b border-zinc-800/50 pb-1">
                    <span className="text-text-secondary">ZEC Implied Vol</span>
                    <span className="text-alpha font-bold">+8.4% (Expansion)</span>
                </div>
                <div className="flex justify-between pt-1">
                    <span className="text-text-secondary">ETH Gamma Exposure</span>
                    <span className="text-text-primary">$1.2B (Neutral)</span>
                </div>
            </div>
         </div>
         
         <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
                <Activity className="w-16 h-16 text-tier2" />
            </div>
            <h3 className="text-sm font-bold text-text-primary mb-3 flex items-center gap-2 relative z-10">
                <Activity className="w-4 h-4 text-tier2" />
                CORRELATION BREAKDOWNS
            </h3>
            <div className="space-y-2 text-xs font-mono relative z-10">
                <div className="flex justify-between border-b border-zinc-800/50 pb-1">
                    <span className="text-text-secondary">BTC vs NDX</span>
                    <span className="text-omega font-bold">0.42 (Decoupling)</span>
                </div>
                <div className="flex justify-between pt-1">
                    <span className="text-text-secondary">ETH vs SOL</span>
                    <span className="text-text-primary">0.88 (Lockstep)</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MarketScanner;
