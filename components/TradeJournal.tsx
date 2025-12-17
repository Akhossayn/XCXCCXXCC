
import React from 'react';
import { History, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';

const TradeJournal: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            TRADE JOURNAL
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-mono">PERFORMANCE LOG // EXECUTION REVIEW</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <Filter className="w-3 h-3" /> FILTER LOGS
        </button>
      </div>

      <div className="bg-bg-card border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-xs font-mono">
              <thead className="bg-zinc-900/50 text-zinc-500 border-b border-zinc-800">
                  <tr>
                      <th className="px-4 py-3 text-left">TIME (UTC)</th>
                      <th className="px-4 py-3 text-left">PAIR</th>
                      <th className="px-4 py-3 text-center">SIDE</th>
                      <th className="px-4 py-3 text-right">ENTRY</th>
                      <th className="px-4 py-3 text-right">EXIT</th>
                      <th className="px-4 py-3 text-right">PNL</th>
                      <th className="px-4 py-3 text-left pl-6">STRATEGY</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-400">12:42:05</td>
                      <td className="px-4 py-3 font-bold text-white">BTC/USDT</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">LONG</span></td>
                      <td className="px-4 py-3 text-right text-zinc-300">97,850.5</td>
                      <td className="px-4 py-3 text-right text-zinc-300">98,120.0</td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-bold">+$3,240</td>
                      <td className="px-4 py-3 pl-6 text-zinc-500">Liq Cascade Hunt</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-400">10:15:33</td>
                      <td className="px-4 py-3 font-bold text-white">ETH/USDT</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">SHORT</span></td>
                      <td className="px-4 py-3 text-right text-zinc-300">3,450.20</td>
                      <td className="px-4 py-3 text-right text-zinc-300">3,442.10</td>
                      <td className="px-4 py-3 text-right text-emerald-400 font-bold">+$850</td>
                      <td className="px-4 py-3 pl-6 text-zinc-500">Mean Reversion V2</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-400">09:08:12</td>
                      <td className="px-4 py-3 font-bold text-white">SOL/USDT</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">LONG</span></td>
                      <td className="px-4 py-3 text-right text-zinc-300">145.20</td>
                      <td className="px-4 py-3 text-right text-zinc-300">144.90</td>
                      <td className="px-4 py-3 text-right text-rose-400 font-bold">-$120</td>
                      <td className="px-4 py-3 pl-6 text-zinc-500">Momentum Breakout</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default TradeJournal;
