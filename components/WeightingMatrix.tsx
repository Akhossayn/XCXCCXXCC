import React from 'react';
import { Table } from 'lucide-react';
import { WeightingRow } from '../types';

const weights: WeightingRow[] = [
  { indicator: 'SONAR_CORE', type: 'POWER_ALPHA', weight: 15, description: 'Target ID & Detection' },
  { indicator: 'ALPHA-OMEGA', type: 'POWER_ALPHA', weight: 15, description: 'Reversal Context' },
  { indicator: 'JET-EJECT', type: 'EXECUTION_PROTOCOL', weight: 100, description: 'Exit Mechanism (Override)' },
  { indicator: 'IFA', type: 'POWER_ALPHA', weight: 12, description: 'Institutional Flow Algo' },
  { indicator: 'INFLECTION_RATIO', type: 'POWER_ALPHA', weight: 10, description: 'Momentum Acceleration' },
  { indicator: 'LLDI_ZONES', type: 'POWER_ALPHA', weight: 10, description: 'Liquidation Pain Maps' },
  { indicator: 'WHALE_ABSORP', type: 'POWER_ALPHA', weight: 8, description: 'Smart Money Footprint' },
  { indicator: 'FUNDING_ARB', type: 'POWER_ALPHA', weight: 8, description: 'Cross-Tower Exploit' },
  { indicator: 'CVD_VELOCITY', type: 'POWER_ALPHA', weight: 8, description: 'Retail Blood Flow' },
  { indicator: 'OBI_TREND', type: 'POWER_ALPHA', weight: 6, description: 'Market Maker Intent' },
  { indicator: 'PRESSURE_WALLS', type: 'POWER_ALPHA', weight: 6, description: 'Order Book Traps' },
  { indicator: 'SPRING_COILED', type: 'POWER_ALPHA', weight: 5, description: 'Pre-Overturn Setup' },
  { indicator: 'FED_HARVEST', type: 'MACRO_EVENT', weight: 0, description: 'Macro Event Predator (Conditional)' },
];

const WeightingMatrix: React.FC = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
          <Table className="w-4 h-4 text-text-secondary" />
          SINGULARITY WEIGHTING MATRIX
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="text-text-secondary font-semibold border-b border-zinc-800">
              <th className="p-2 text-left">INDICATOR</th>
              <th className="p-2 text-left">TYPE</th>
              <th className="p-2 text-right">WEIGHT</th>
              <th className="p-2 text-left pl-4">FUNCTION</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((row, idx) => (
              <tr 
                key={idx} 
                className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors`}
              >
                <td className="p-2 font-mono font-medium text-text-primary">{row.indicator}</td>
                <td className="p-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${row.type === 'EXECUTION_PROTOCOL' ? 'text-danger bg-danger/10' : 'text-emerald-500 bg-emerald-500/10'}`}>
                        {row.type.replace('_', ' ')}
                    </span>
                </td>
                <td className="p-2 text-right font-mono text-text-secondary">
                  {row.weight > 0 ? `${row.weight}%` : 'COND'}
                </td>
                <td className="p-2 pl-4 text-text-muted">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeightingMatrix;