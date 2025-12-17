
import React from 'react';
import { Rocket, Server, Activity, Shield, Database, Wifi } from 'lucide-react';

const DeploymentStatus: React.FC = () => {
  return (
    <div className="mt-8 border-t border-zinc-800 bg-[#0c0c0e] py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left: Infrastructure Title */}
        <div className="flex items-center gap-2 text-text-primary font-bold uppercase tracking-wider">
           <Server className="w-4 h-4 text-primary" />
           INFRASTRUCTURE HEALTH
        </div>

        {/* Center: Status Metrics */}
        <div className="flex flex-wrap items-center gap-6">
           <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500 uppercase text-[10px]">ClickHouse DB:</span>
              <span className="font-mono text-emerald-500 font-bold">OPTIMAL (4ms)</span>
           </div>
           
           <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500 uppercase text-[10px]">Kafka Stream:</span>
              <span className="font-mono text-emerald-500 font-bold">45k msg/s</span>
           </div>
           
           <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500 uppercase text-[10px]">Feed Latency:</span>
              <span className="font-mono text-emerald-500 font-bold">12ms</span>
           </div>
           
           <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-zinc-500" />
              <span className="text-zinc-500 uppercase text-[10px]">Risk Guard:</span>
              <span className="font-mono text-omega font-bold">ARMED (MaxDD 8%)</span>
           </div>
        </div>

        {/* Right: Version */}
        <div className="text-[10px] text-zinc-600 font-mono">
            SYS.V2.4.1 // PROD
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatus;
