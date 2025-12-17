
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, ComposedChart, Line } from 'recharts';
import { Activity, ArrowUp, ArrowDown } from 'lucide-react';

const generateStableData = () => {
    // Generate a smoother curve using sine waves + consistent trend
    return Array.from({ length: 24 }, (_, i) => {
        const trend = i * 100; // General upward trend
        const wave = Math.sin(i / 3) * 1000; // Smooth wave
        const inflow = 3000 + trend + wave + (Math.random() * 200); // Low jitter
        const outflow = 2500 + trend + (Math.sin(i / 3 + 1) * 1000) + (Math.random() * 200);
        return {
            time: `${i}:00`,
            inflow: Math.floor(inflow),
            outflow: Math.floor(outflow),
            net: Math.floor(inflow - outflow),
            price: 98000 + (i * 20) + Math.sin(i) * 100, // Updated to 98k
        };
    });
};

const NetflowMonitor: React.FC = () => {
    const data = generateStableData();
    const lastPoint = data[data.length - 1];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="border-b border-zinc-800 pb-4 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        NETFLOW MONITOR
                    </h2>
                    <p className="text-xs text-text-secondary mt-1 font-mono">EXCHANGE WALLET FLOWS // STABLECOIN VELOCITY</p>
                </div>
                <div className="flex gap-4">
                     <div className="text-right">
                         <div className="text-[10px] text-zinc-500 uppercase">24h Net Inflow</div>
                         <div className={`font-mono font-bold ${lastPoint.net > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {lastPoint.net > 0 ? '+' : ''}{(lastPoint.net / 1000).toFixed(2)}M
                         </div>
                     </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Netflow Delta */}
                <div className="bg-bg-card border border-zinc-800 rounded-lg p-4 h-[300px]">
                    <div className="text-xs font-bold text-zinc-500 mb-4 uppercase">Exchange Net Position Change (Hourly)</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', fontSize: '12px' }}
                                itemStyle={{ color: '#e4e4e7' }}
                            />
                            <Bar dataKey="net" radius={[2, 2, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.net > 0 ? '#10b981' : '#f43f5e'} />
                                ))}
                            </Bar>
                            <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} strokeWidth={2} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart 2: Total Volume Flow */}
                <div className="bg-bg-card border border-zinc-800 rounded-lg p-4 h-[300px]">
                    <div className="text-xs font-bold text-zinc-500 mb-4 uppercase">Inflow vs Outflow Volume</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="time" hide />
                            <YAxis hide />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', fontSize: '12px' }}
                            />
                            <Area type="monotone" dataKey="inflow" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" stackId="1" />
                            <Area type="monotone" dataKey="outflow" stroke="#f43f5e" fillOpacity={1} fill="url(#colorOut)" stackId="1" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded flex items-center justify-between">
                     <div>
                         <div className="text-[10px] text-zinc-500 uppercase">Large Wallet Inflow</div>
                         <div className="text-lg font-mono font-bold text-emerald-500 flex items-center gap-1">
                             <ArrowUp className="w-4 h-4" /> 2,450 BTC
                         </div>
                     </div>
                     <div className="h-8 w-16 bg-emerald-500/10 rounded"></div>
                 </div>
                 <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded flex items-center justify-between">
                     <div>
                         <div className="text-[10px] text-zinc-500 uppercase">Miner Distribution</div>
                         <div className="text-lg font-mono font-bold text-rose-500 flex items-center gap-1">
                             <ArrowDown className="w-4 h-4" /> 120 BTC
                         </div>
                     </div>
                     <div className="h-8 w-16 bg-rose-500/10 rounded"></div>
                 </div>
                 <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded flex items-center justify-between">
                     <div>
                         <div className="text-[10px] text-zinc-500 uppercase">Stablecoin Minting</div>
                         <div className="text-lg font-mono font-bold text-blue-500 flex items-center gap-1">
                             <ArrowUp className="w-4 h-4" /> 450M USDT
                         </div>
                     </div>
                     <div className="h-8 w-16 bg-blue-500/10 rounded"></div>
                 </div>
            </div>
        </div>
    );
};

export default NetflowMonitor;
