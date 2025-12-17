
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { Flame, ArrowUpCircle, ArrowDownCircle, Users, Scale, RefreshCw, BarChart2 } from 'lucide-react';

interface LiquidityAnalyticsProps {
    price: number;
}

const LiquidityAnalytics: React.FC<LiquidityAnalyticsProps> = ({ price }) => {
    // State for live fluctuation
    const [tick, setTick] = useState(0);

    // Live update loop
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Dynamic Data Generation
    const getRandomDelta = (base: number, variance: number) => {
        return base + (Math.random() - 0.5) * variance;
    };

    const venues = [
        { name: 'BINANCE SPOT', volume: 1420, delta: 125, bias: 'LONG' },
        { name: 'BINANCE PERP', volume: 8500, delta: -450, bias: 'SHORT' },
        { name: 'COINBASE SPOT', volume: 680, delta: 320, bias: 'LONG' },
        { name: 'BYBIT PERP', volume: 4200, delta: -150, bias: 'SHORT' },
        { name: 'HYPERLIQUID', volume: 1200, delta: 45, bias: 'NEUTRAL' },
    ];

    const lsRatio = [
        { name: 'Global', long: getRandomDelta(62, 2), short: getRandomDelta(38, 2) },
        { name: 'Top Traders', long: getRandomDelta(45, 4), short: getRandomDelta(55, 4) },
        { name: 'Whales', long: getRandomDelta(41, 1), short: getRandomDelta(59, 1) },
    ];

    const netPositioning = [
        { time: '1h', net: Math.floor(getRandomDelta(1200, 100)), type: 'LONG' },
        { time: '4h', net: Math.floor(getRandomDelta(-450, 50)), type: 'SHORT' },
        { time: '12h', net: 890, type: 'LONG' }, // More static
        { time: '24h', net: -2100, type: 'SHORT' }, // Static
    ];

    const heatLiqs = [
        { price: 99100, vol: 450, side: 'SHORT' },
        { price: 98800, vol: 120, side: 'SHORT' },
        { price: 98500, vol: 80, side: 'SHORT' },
        { price: 98450 + Math.floor((Math.random()-0.5)*20), vol: 0, side: 'CURRENT' },
        { price: 97800, vol: 350, side: 'LONG' },
        { price: 97500, vol: 890, side: 'LONG' },
        { price: 97200, vol: 1200, side: 'LONG' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Scale className="w-5 h-5 text-primary" />
                        LIQUIDITY ANALYTICS
                    </h2>
                    <p className="text-xs text-text-secondary mt-1 font-mono">POSITIONING // RATIOS // LIQUIDATION HEATMAP</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">LIVE UPDATE</span>
                </div>
            </div>

            {/* LONG VS SHORT RATIOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {lsRatio.map((ratio, idx) => (
                    <div key={idx} className="bg-bg-card border border-zinc-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-zinc-400 uppercase">{ratio.name} L/S Ratio</span>
                            <span className={`text-xs font-bold font-mono ${ratio.long > ratio.short ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {(ratio.long / ratio.short).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex h-4 rounded overflow-hidden relative">
                            <div className="bg-emerald-500/90 flex items-center justify-center text-[9px] font-bold text-black transition-all duration-300" style={{ width: `${ratio.long}%` }}>
                                {ratio.long.toFixed(0)}%
                            </div>
                            <div className="bg-rose-500/90 flex items-center justify-center text-[9px] font-bold text-white transition-all duration-300" style={{ width: `${ratio.short}%` }}>
                                {ratio.short.toFixed(0)}%
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-zinc-500">
                            <span>LONG</span>
                            <span>SHORT</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* HEAT LIQUIDATIONS */}
                <div className="col-span-1 lg:col-span-2 bg-bg-card border border-zinc-800 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <h3 className="text-sm font-bold text-text-primary">HEAT LIQUIDATIONS MAP</h3>
                    </div>
                    
                    <div className="space-y-1">
                        {heatLiqs.map((level, i) => (
                            <div key={i} className="flex items-center text-xs font-mono h-8 hover:bg-zinc-900/50 px-2 rounded group">
                                <div className="w-20 text-right pr-4 text-zinc-400 group-hover:text-white">{level.price}</div>
                                <div className="flex-1 relative h-6 flex items-center">
                                    {level.side === 'CURRENT' ? (
                                        <div className="w-full border-t border-dashed border-zinc-500 text-center text-[9px] text-zinc-500 flex items-center justify-center gap-2">
                                            <span>CURRENT PRICE</span>
                                            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                        </div>
                                    ) : (
                                        <div 
                                            className={`h-4 rounded ${level.side === 'SHORT' ? 'bg-orange-500/80' : 'bg-blue-500/80'} transition-all duration-500`}
                                            style={{ width: `${(level.vol / 1200) * 100}%` }}
                                        ></div>
                                    )}
                                </div>
                                <div className="w-20 text-right pl-4 text-zinc-300 font-bold">
                                    {level.vol > 0 ? `$${level.vol}M` : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-orange-500"></div> SHORT LIQ (Resistance)</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-500"></div> LONG LIQ (Support)</span>
                    </div>
                </div>

                {/* NET POSITIONING */}
                <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-text-primary">NET POSITIONING DELTA</h3>
                    </div>
                    
                    <div className="space-y-4">
                        {netPositioning.map((item, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-zinc-900 pb-2 last:border-0">
                                <span className="text-xs text-zinc-500 font-mono w-12">{item.time}</span>
                                <div className="flex-1 px-4">
                                     <div className={`h-1.5 rounded-full ${item.net > 0 ? 'bg-emerald-500' : 'bg-rose-500'} transition-all duration-500`} style={{ width: `${Math.min(Math.abs(item.net)/25, 100)}%` }}></div>
                                </div>
                                <div className={`text-xs font-mono font-bold w-20 text-right ${item.net > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {item.net > 0 ? '+' : ''}{item.net} BTC
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800">
                        <div className="text-[10px] text-zinc-500 uppercase mb-2">New Positions (15m)</div>
                        <div className="flex gap-2">
                             <div className="flex-1 bg-emerald-900/20 border border-emerald-900/50 rounded p-2 text-center">
                                 <div className="text-[9px] text-emerald-500">NEW LONGS</div>
                                 <div className="font-mono font-bold text-emerald-400 transition-all duration-300">
                                    +{Math.floor(getRandomDelta(1240, 50))}
                                 </div>
                             </div>
                             <div className="flex-1 bg-rose-900/20 border border-rose-900/50 rounded p-2 text-center">
                                 <div className="text-[9px] text-rose-500">NEW SHORTS</div>
                                 <div className="font-mono font-bold text-rose-400 transition-all duration-300">
                                    +{Math.floor(getRandomDelta(850, 40))}
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* SPECIFIC INDICATOR MATRIX (REPLACED GENERIC CARDS) */}
            <div className="bg-bg-card rounded-lg border border-zinc-800 p-5">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-primary" />
                        REAL-TIME TAKER FLOW & DELTA
                    </h3>
                    <div className="text-[10px] text-zinc-500 uppercase">AGGREGATED VENUE FEED</div>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono">
                        <thead>
                            <tr className="text-zinc-500 border-b border-zinc-800 text-[10px] uppercase">
                                <th className="text-left py-2">Venue / Instrument</th>
                                <th className="text-right py-2">Taker Vol (1H)</th>
                                <th className="text-right py-2">Net Delta</th>
                                <th className="text-right py-2">Taker Buy/Sell</th>
                                <th className="text-right py-2">Bias</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {venues.map((v, i) => {
                                const delta = Math.floor(getRandomDelta(v.delta, 20));
                                const vol = Math.floor(getRandomDelta(v.volume, 50));
                                const ratio = (1 + (delta / vol)).toFixed(2);
                                return (
                                    <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="py-3 font-bold text-zinc-300">{v.name}</td>
                                        <td className="py-3 text-right text-zinc-400">{vol.toLocaleString()} BTC</td>
                                        <td className={`py-3 text-right font-bold ${delta > 0 ? 'text-emerald-500' : delta < 0 ? 'text-rose-500' : 'text-zinc-500'}`}>
                                            {delta > 0 ? '+' : ''}{delta} BTC
                                        </td>
                                        <td className="py-3 text-right text-zinc-300">{ratio}x</td>
                                        <td className="py-3 text-right">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                v.bias === 'LONG' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                                                v.bias === 'SHORT' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                                                'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                            }`}>
                                                {v.bias}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default LiquidityAnalytics;
