
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const CorrelationMatrix: React.FC = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
          <Activity className="w-4 h-4 text-primary" />
          EXCHANGE SPREAD & CORRELATION
        </h2>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-zinc-800 rounded text-text-secondary">Basis (bps)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-text-secondary border-b border-zinc-800">
              <th className="pb-3 text-left">PAIR</th>
              <th className="pb-3 text-right">BINANCE</th>
              <th className="pb-3 text-right">COINBASE</th>
              <th className="pb-3 text-right">BYBIT</th>
              <th className="pb-3 text-right">DELTA (Δ)</th>
              <th className="pb-3 text-right">CORR (7d)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <tr className="hover:bg-bg-hover transition-colors">
              <td className="py-3 font-bold text-text-primary">BTC/USDT</td>
              <td className="py-3 text-right text-text-secondary">98,450.50</td>
              <td className="py-3 text-right text-text-secondary">98,465.10</td>
              <td className="py-3 text-right text-text-secondary">98,448.00</td>
              <td className="py-3 text-right text-alpha font-bold">+17.10</td>
              <td className="py-3 text-right text-text-primary">0.98</td>
            </tr>
            <tr className="hover:bg-bg-hover transition-colors">
              <td className="py-3 font-bold text-text-primary">ETH/USDT</td>
              <td className="py-3 text-right text-text-secondary">3,450.20</td>
              <td className="py-3 text-right text-text-secondary">3,452.80</td>
              <td className="py-3 text-right text-text-secondary">3,449.50</td>
              <td className="py-3 text-right text-alpha font-bold">+2.60</td>
              <td className="py-3 text-right text-text-primary">0.96</td>
            </tr>
            <tr className="hover:bg-bg-hover transition-colors">
              <td className="py-3 font-bold text-text-primary">SOL/USDT</td>
              <td className="py-3 text-right text-text-secondary">148.50</td>
              <td className="py-3 text-right text-text-secondary">149.10</td>
              <td className="py-3 text-right text-text-secondary">148.25</td>
              <td className="py-3 text-right text-alpha font-bold">+0.60</td>
              <td className="py-3 text-right text-omega">0.82</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
            <div className="text-[10px] text-text-secondary uppercase mb-1">Funding Rate Arbitrage</div>
            <div className="flex justify-between items-end">
                <span className="text-xl font-mono text-alpha">0.0104%</span>
                <span className="text-xs text-text-muted">Bybit &gt; Binance</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-alpha h-full" style={{width: '75%'}}></div>
            </div>
        </div>
        <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
            <div className="text-[10px] text-text-secondary uppercase mb-1">Vol Surface Skew</div>
            <div className="flex justify-between items-end">
                <span className="text-xl font-mono text-omega">-2.4%</span>
                <span className="text-xs text-text-muted">Put Heavy (24h)</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 mt-2 rounded-full overflow-hidden">
                <div className="bg-omega h-full" style={{width: '60%'}}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
