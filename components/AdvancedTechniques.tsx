
import React from 'react';
import { Layers, Plus, Book, Zap } from 'lucide-react';
import WeightingMatrix from './WeightingMatrix';
import ExecutionFramework from './ExecutionFramework';

const AdvancedTechniques: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="border-b border-zinc-800 pb-4 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Layers className="w-5 h-5 text-convergence" />
            STRATEGY PLAYBOOKS & LOGIC
            </h2>
            <p className="text-xs text-text-secondary mt-1 font-mono">EXECUTION PROTOCOLS // INDICATOR WEIGHTS // MY LIBRARY</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors">
            <Plus className="w-3 h-3" /> NEW STRATEGY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Execution Framework moved here */}
          <ExecutionFramework />
          
          {/* My Library */}
          <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-text-primary flex items-center gap-2">
                      <Book className="w-4 h-4 text-tier2" />
                      MY STRATEGY LIBRARY
                  </h3>
              </div>
              <div className="space-y-3">
                  {[
                      { title: 'Mean Reversion V2', tags: ['SCALP', 'ASIA'], active: true },
                      { title: 'Liquidation Cascade Hunt', tags: ['MOMENTUM', 'BREAKOUT'], active: false },
                      { title: 'Funding Arb (Neutral)', tags: ['ARBITRAGE', 'LOW_RISK'], active: false },
                  ].map((s, i) => (
                      <div key={i} className={`p-3 rounded border flex justify-between items-center cursor-pointer transition-colors ${s.active ? 'bg-primary/10 border-primary/30' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}>
                          <div>
                              <div className={`font-bold text-sm ${s.active ? 'text-primary' : 'text-zinc-300'}`}>{s.title}</div>
                              <div className="flex gap-2 mt-1">
                                  {s.tags.map(t => <span key={t} className="text-[9px] text-zinc-500 font-mono px-1 bg-black rounded">{t}</span>)}
                              </div>
                          </div>
                          {s.active && <div className="text-[10px] font-bold text-primary bg-primary/20 px-2 py-1 rounded">ARMED</div>}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Weighting Matrix moved here */}
      <WeightingMatrix />

    </div>
  );
};

export default AdvancedTechniques;
