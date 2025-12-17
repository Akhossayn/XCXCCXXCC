
import React from 'react';
import { Bot, Sliders, Cpu, Code } from 'lucide-react';

const AlgoConfig: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          ALGORITHMIC ENGINE CONFIG
        </h2>
        <p className="text-xs text-text-secondary mt-1 font-mono">EXECUTION LOGIC // PARAMETER TUNING // LATENCY</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TWAP / VWAP Engine */}
          <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                  <Cpu className="w-4 h-4 text-tier2" />
                  <h3 className="text-sm font-bold text-text-primary">EXECUTION ENGINES</h3>
              </div>
              
              <div className="space-y-4">
                  <div className="p-4 bg-zinc-900/50 rounded border border-zinc-800">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-white">TWAP (Time Weighted)</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded border border-emerald-500/20">ACTIVE</span>
                      </div>
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs text-zinc-400">
                              <span>Duration</span>
                              <span className="font-mono text-zinc-200">60 mins</span>
                          </div>
                          <div className="flex justify-between text-xs text-zinc-400">
                              <span>Randomization</span>
                              <span className="font-mono text-zinc-200">±15%</span>
                          </div>
                      </div>
                  </div>

                   <div className="p-4 bg-zinc-900/50 rounded border border-zinc-800 opacity-60">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-zinc-400">Iceberg (Sniper)</span>
                          <span className="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-[9px] font-bold rounded border border-zinc-700">STANDBY</span>
                      </div>
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs text-zinc-500">
                              <span>Display Qty</span>
                              <span className="font-mono">1.5 BTC</span>
                          </div>
                          <div className="flex justify-between text-xs text-zinc-500">
                              <span>Variance</span>
                              <span className="font-mono">High</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Logic Parameters */}
          <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
               <div className="flex items-center gap-2 mb-4">
                  <Sliders className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-text-primary">SENSITIVITY TUNING</h3>
              </div>

              <div className="space-y-5">
                  <div>
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">CVD Divergence Threshold</span>
                          <span className="font-mono text-primary">15.0%</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">Order Book Imbalance Bias</span>
                          <span className="font-mono text-primary">0.65</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-300">Max Slippage Tolerance</span>
                          <span className="font-mono text-primary">5 bps</span>
                      </div>
                      <input type="range" className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  
                  <div className="p-3 bg-black rounded border border-zinc-800 font-mono text-[10px] text-zinc-400 mt-4">
                      <div className="flex items-center gap-2 mb-1 text-zinc-500">
                          <Code className="w-3 h-3" /> JSON CONFIG PREVIEW
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap">
{`{
  "strategy": "MOMENTUM_V4",
  "execution": {
    "type": "TWAP",
    "slice_interval": "random(45s, 120s)",
    "participation_rate": 0.05
  }
}`}
                      </pre>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AlgoConfig;
