import React from 'react';
import { Shield, Clock, CheckCircle, Zap } from 'lucide-react';

const ExecutionFramework: React.FC = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
          <Zap className="w-5 h-5 text-primary" />
          EXECUTION LOGIC
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-2">
        {/* Tier 1 */}
        <div className="bg-zinc-900/50 border-l-2 border-tier1 p-3 flex justify-between items-center hover:bg-zinc-800/30 transition-colors">
          <div>
            <div className="text-sm font-bold text-text-primary">TIER 1 (Max Conviction)</div>
            <div className="text-xs text-text-secondary mt-1">Alpha &gt; 0.85 &amp; Omega &gt; 0.92</div>
          </div>
          <div className="text-right">
             <div className="text-xs font-mono text-tier1 font-bold">Pos: 3.0%</div>
             <div className="text-[10px] text-text-muted">R:R 3.5:1</div>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-zinc-900/50 border-l-2 border-tier2 p-3 flex justify-between items-center hover:bg-zinc-800/30 transition-colors">
          <div>
            <div className="text-sm font-bold text-text-primary">TIER 2 (Directional)</div>
            <div className="text-xs text-text-secondary mt-1">Alpha &gt; 0.85 &amp; Omega &lt; 0.92</div>
          </div>
          <div className="text-right">
             <div className="text-xs font-mono text-tier2 font-bold">Pos: 1.5%</div>
             <div className="text-[10px] text-text-muted">R:R 2.5:1</div>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-zinc-900/50 border-l-2 border-tier3 p-3 flex justify-between items-center hover:bg-zinc-800/30 transition-colors">
          <div>
            <div className="text-sm font-bold text-text-primary">TIER 3 (Mean Reversion)</div>
            <div className="text-xs text-text-secondary mt-1">Alpha &lt; 0.85 &amp; Omega &gt; 0.92</div>
          </div>
          <div className="text-right">
             <div className="text-xs font-mono text-tier3 font-bold">Pos: 1.0%</div>
             <div className="text-[10px] text-text-muted">R:R 4.0:1</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-800 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Shield className="w-3 h-3 text-omega" />
          <span>Stop: 8% Max DD</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          <span>Stress Tested 100x</span>
        </div>
      </div>
    </div>
  );
};

export default ExecutionFramework;