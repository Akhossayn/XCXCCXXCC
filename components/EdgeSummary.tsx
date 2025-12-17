import React from 'react';
import { Crown, Globe, RefreshCw, Layers, Wind, Database } from 'lucide-react';

const EdgeSummary: React.FC = () => {
  return (
    <div className="mt-5 bg-bg-card rounded-lg p-6 border border-zinc-800">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-5 text-text-primary">
        <Crown className="w-5 h-5 text-omega" />
        SYSTEM EDGE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Globe, title: 'Multi-Venue Truth', desc: 'Cross-reference Binance, Bybit, Coinbase data tapes.' },
          { icon: RefreshCw, title: 'Netflow Logic', desc: 'Whale inflow precedes volatility. Outflow precedes accumulation.' },
          { icon: Layers, title: 'Tiered Execution', desc: 'Size positions dynamically based on Signal Confidence.' },
          { icon: Wind, title: 'Regime Filter', desc: 'Funding/Basis correlation detects Trend vs Chop.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-zinc-900/50 rounded p-4 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-text-primary">
              <item.icon className="w-4 h-4 text-primary" />
              {item.title}
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-zinc-800 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary">
            <Database className="w-3 h-3 text-tier2" />
            <span>Archive Integrity: <span className="text-emerald-500">100%</span></span>
            <span className="mx-2">|</span>
            <span>Phase: <span className="text-text-primary">Week 2 Integration</span></span>
        </div>
        <div className="text-[10px] text-text-muted uppercase tracking-widest">
            Harvesting Alpha
        </div>
      </div>
    </div>
  );
};

export default EdgeSummary;