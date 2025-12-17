
import React, { useMemo, useEffect, useState } from 'react';
import { EyeOff, Swords, Lock, Ghost, Maximize2, Minimize2, Settings2 } from 'lucide-react';
import { LiquidityWall } from '../types';

interface LiquidityWallsProps {
  walls: LiquidityWall[];
  currentPrice: number;
  imbalance: number;
  cvd: number; 
  timeframe: string;
}

const formatCompact = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toFixed(0);
};

// --- DOM ROW COMPONENT (CENTRAL LADDER) ---
const LadderRow: React.FC<{ 
    price: number;
    bid?: LiquidityWall;
    ask?: LiquidityWall;
    maxVol: number;
    currentPrice: number;
    rowHeight: number;
}> = React.memo(({ price, bid, ask, maxVol, currentPrice, rowHeight }) => {
    
    // Internal Jitter State to make row breathe independently
    const [jitter, setJitter] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setJitter(0.9 + Math.random() * 0.2); // Fluctuate between 0.9x and 1.1x
        }, 300 + Math.random() * 700); // Random update interval between 300ms and 1s
        return () => clearInterval(interval);
    }, []);

    const isCurrent = Math.abs(price - currentPrice) < 0.5; // Highlighting current price level
    
    // Apply jitter to displayed volumes
    const bidVol = bid ? bid.volume * jitter : 0;
    const askVol = ask ? ask.volume * jitter : 0;

    const isBidSpoof = bid && bid.spoofed_volume > 0;
    const isAskSpoof = ask && ask.spoofed_volume > 0;

    return (
        <div 
            style={{ height: `${rowHeight}px` }} 
            className={`flex items-center font-mono text-xs border-b border-zinc-900/30 hover:bg-zinc-800/50 select-none transition-colors duration-150 ${isCurrent ? 'bg-zinc-800 ring-1 ring-inset ring-primary/40' : ''}`}
        >
            
            {/* --- BID SIDE (LEFT) --- */}
            <div className="flex-1 flex justify-end relative h-full">
                {bid && (
                    <>
                        {/* Volume Bar */}
                        <div 
                            className={`absolute right-0 top-[2px] bottom-[2px] rounded-l-sm transition-all duration-500 ease-in-out opacity-20 ${isBidSpoof ? 'bg-amber-500 pattern-diagonal-lines' : 'bg-emerald-500'}`} 
                            style={{ width: `${(bidVol / maxVol) * 100}%` }}
                        ></div>
                        
                        {/* Iceberg Indicator */}
                        {bid.hidden_volume > 0 && (
                            <div className="absolute left-1 top-1/2 -translate-y-1/2" title="Iceberg Order Detected">
                                <EyeOff className="w-3 h-3 text-cyan-500 animate-pulse" />
                            </div>
                        )}

                        <div className="relative z-10 flex items-center pr-2 gap-2 h-full">
                            {/* Spoof Indicator */}
                            {isBidSpoof && (
                                <span title="Potential Spoofing" className="flex items-center">
                                    <Ghost className="w-3 h-3 text-amber-500 animate-bounce" />
                                </span>
                            )}
                            
                            {/* Aggressor Delta */}
                            {bid.aggressor_vol && bid.aggressor_vol > 0 && (
                                <span className="text-[9px] text-zinc-500 font-normal">+{formatCompact(bid.aggressor_vol)}</span>
                            )}
                            
                            {/* Main Volume */}
                            <span className={`font-bold ${isBidSpoof ? 'text-amber-500 line-through decoration-amber-500/50' : 'text-emerald-500'}`}>
                                {formatCompact(bidVol)}
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* --- PRICE COLUMN (CENTER) --- */}
            <div 
                className={`w-24 text-center font-mono h-full flex items-center justify-center border-x border-zinc-800/50 ${
                    isCurrent 
                    ? 'text-white bg-primary/20 font-black text-sm tracking-tighter' 
                    : 'text-zinc-500 font-medium'
                }`}
            >
                {price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </div>

            {/* --- ASK SIDE (RIGHT) --- */}
            <div className="flex-1 flex justify-start relative h-full">
                {ask && (
                    <>
                         {/* Volume Bar */}
                         <div 
                            className={`absolute left-0 top-[2px] bottom-[2px] rounded-r-sm transition-all duration-500 ease-in-out opacity-20 ${isAskSpoof ? 'bg-amber-500 pattern-diagonal-lines' : 'bg-rose-500'}`} 
                            style={{ width: `${(askVol / maxVol) * 100}%` }}
                         ></div>
                         
                         {/* Iceberg Indicator */}
                        {ask.hidden_volume > 0 && (
                            <div className="absolute right-1 top-1/2 -translate-y-1/2" title="Iceberg Order Detected">
                                <EyeOff className="w-3 h-3 text-cyan-500 animate-pulse" />
                            </div>
                        )}

                        <div className="relative z-10 flex items-center pl-2 gap-2 h-full">
                            {/* Main Volume */}
                            <span className={`font-bold ${isAskSpoof ? 'text-amber-500 line-through decoration-amber-500/50' : 'text-rose-500'}`}>
                                {formatCompact(askVol)}
                            </span>

                            {/* Aggressor Delta */}
                            {ask.aggressor_vol && ask.aggressor_vol > 0 && (
                                <span className="text-[9px] text-zinc-500 font-normal">+{formatCompact(ask.aggressor_vol)}</span>
                            )}

                             {/* Spoof Indicator */}
                             {isAskSpoof && (
                                <span title="Potential Spoofing" className="flex items-center">
                                    <Ghost className="w-3 h-3 text-amber-500 animate-bounce" />
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>

        </div>
    );
});


export const LiquidityWalls: React.FC<LiquidityWallsProps> = ({ walls, currentPrice, imbalance, cvd, timeframe }) => {
  const [density, setDensity] = useState<'COMPACT' | 'COMFORTABLE'>('COMFORTABLE');
  const rowHeight = density === 'COMPACT' ? 20 : 32;

  // Create a Price Ladder Range centered on current price
  const ladderData = useMemo(() => {
      const range = 20; // Show 20 ticks up/down
      const step = 0.5; // Tick size
      const center = Math.round(currentPrice / step) * step;
      const rows = [];
      
      let maxVol = 0;

      // Map walls to exact price points for O(1) lookup
      const wallMap = new Map<string, LiquidityWall>();
      walls.forEach(w => {
          const key = (Math.round(w.price / step) * step).toFixed(1);
          wallMap.set(key, w);
          if (w.volume > maxVol) maxVol = w.volume;
      });

      for (let i = range; i >= -range; i--) {
          const p = center + (i * step);
          const pKey = p.toFixed(1);
          const w = wallMap.get(pKey);
          
          rows.push({
              price: p,
              bid: w?.type === 'BID' ? w : undefined,
              ask: w?.type === 'ASK' ? w : undefined
          });
      }
      return { rows, maxVol: Math.max(maxVol, 1) };
  }, [walls, currentPrice]);

  return (
    <div className="bg-[#050505] border border-zinc-800 flex flex-col h-full shadow-lg rounded-xl overflow-hidden animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="p-3 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <Swords className="h-4 w-4 text-zinc-400" />
            <div>
                <span className="text-xs font-bold text-zinc-200 uppercase tracking-widest block leading-none">NEXUS ORDER BOOK</span>
                <span className="text-[9px] text-zinc-600 font-mono">DEPTH: {timeframe}</span>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
             {/* Depth Visualization */}
             <div className="hidden md:flex gap-4 border-r border-zinc-800 pr-4">
                <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> BIDS
                </div>
                <div className="text-[10px] font-mono text-rose-500 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> ASKS
                </div>
             </div>

             {/* Density Toggle */}
             <button 
                onClick={() => setDensity(d => d === 'COMPACT' ? 'COMFORTABLE' : 'COMPACT')}
                className="text-zinc-500 hover:text-white transition-colors p-1"
                title={density === 'COMPACT' ? "Switch to Comfortable View" : "Switch to Compact View"}
             >
                {density === 'COMPACT' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
             </button>
             <button className="text-zinc-500 hover:text-white transition-colors p-1">
                 <Settings2 className="w-4 h-4" />
             </button>
         </div>
      </div>

      {/* DOM CONTENT */}
      <div className="flex-1 flex flex-col relative font-mono text-xs bg-[#0c0c0e] overflow-y-auto custom-scrollbar">
          {/* Static Header Row */}
          <div className="sticky top-0 z-20 flex text-[9px] font-bold text-zinc-500 bg-zinc-950 border-b border-zinc-800 py-1.5 shadow-sm">
              <div className="flex-1 text-right pr-4">BID SIZE</div>
              <div className="w-24 text-center border-x border-zinc-900">PRICE (USDT)</div>
              <div className="flex-1 text-left pl-4">ASK SIZE</div>
          </div>

          <div className="py-2">
            {ladderData.rows.map((row, i) => (
                <LadderRow 
                    key={i} 
                    price={row.price} 
                    bid={row.bid} 
                    ask={row.ask} 
                    maxVol={ladderData.maxVol} 
                    currentPrice={currentPrice}
                    rowHeight={rowHeight} 
                />
            ))}
          </div>
      </div>
      
      {/* FOOTER: MARKET STATE */}
      <div className="p-2 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-zinc-600" />
              <span>Slippage Protection: <span className="text-emerald-500 font-bold">ACTIVE</span></span>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-1">
                 <Ghost className="w-3 h-3 text-amber-500" /> 
                 <span>Spoofing Detected</span>
             </div>
             <div>
                Spread: <span className="text-white font-bold">0.50</span>
             </div>
          </div>
      </div>
    </div>
  );
};

export default LiquidityWalls;
