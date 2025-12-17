
import React from 'react';
import { Table } from 'lucide-react';

const ConvergenceTable: React.FC = () => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-5">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                <Table className="w-4 h-4 text-zinc-500" />
                INDICATOR WEIGHTING MATRIX
            </h2>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
                <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                        <th className="text-left py-2 font-bold">INDICATOR</th>
                        <th className="text-left py-2 font-bold">TYPE</th>
                        <th className="text-left py-2 font-bold">WEIGHT</th>
                        <th className="text-left py-2 font-bold">DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                    <tr className="border-l-2 border-alpha hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">LQ</td>
                        <td className="py-2"><span className="text-alpha bg-alpha/10 px-1 rounded">Alpha</span></td>
                        <td className="py-2 font-mono text-alpha">25%</td>
                        <td className="py-2 text-zinc-500">Liquidation Clusters</td>
                    </tr>
                    <tr className="border-l-2 border-alpha hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">OBI</td>
                        <td className="py-2"><span className="text-alpha bg-alpha/10 px-1 rounded">Alpha</span></td>
                        <td className="py-2 font-mono text-alpha">25%</td>
                        <td className="py-2 text-zinc-500">Order Book Imbalance</td>
                    </tr>
                    <tr className="border-l-2 border-alpha hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">CLD</td>
                        <td className="py-2"><span className="text-alpha bg-alpha/10 px-1 rounded">Alpha</span></td>
                        <td className="py-2 font-mono text-alpha">20%</td>
                        <td className="py-2 text-zinc-500">Cumulative Liq Delta</td>
                    </tr>
                    <tr className="border-l-2 border-alpha hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">WA</td>
                        <td className="py-2"><span className="text-alpha bg-alpha/10 px-1 rounded">Alpha</span></td>
                        <td className="py-2 font-mono text-alpha">15%</td>
                        <td className="py-2 text-zinc-500">Whale Absorption</td>
                    </tr>
                    <tr className="border-l-2 border-omega hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">XOI</td>
                        <td className="py-2"><span className="text-omega bg-omega/10 px-1 rounded">Omega</span></td>
                        <td className="py-2 font-mono text-omega">30%</td>
                        <td className="py-2 text-zinc-500">Cross-Exchange OI Div</td>
                    </tr>
                    <tr className="border-l-2 border-omega hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">OS</td>
                        <td className="py-2"><span className="text-omega bg-omega/10 px-1 rounded">Omega</span></td>
                        <td className="py-2 font-mono text-omega">25%</td>
                        <td className="py-2 text-zinc-500">Options Skew</td>
                    </tr>
                    <tr className="border-l-2 border-omega hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">SF</td>
                        <td className="py-2"><span className="text-omega bg-omega/10 px-1 rounded">Omega</span></td>
                        <td className="py-2 font-mono text-omega">25%</td>
                        <td className="py-2 text-zinc-500">Stablecoin Flows</td>
                    </tr>
                    <tr className="border-l-2 border-omega hover:bg-zinc-900/50">
                        <td className="py-2 pl-2">BS</td>
                        <td className="py-2"><span className="text-omega bg-omega/10 px-1 rounded">Omega</span></td>
                        <td className="py-2 font-mono text-omega">20%</td>
                        <td className="py-2 text-zinc-500">Basis Structure</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ConvergenceTable;
