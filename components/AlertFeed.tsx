
import React, { useRef, useEffect } from 'react';
import { AlertTriangle, Zap, ShieldAlert, Siren, CheckCircle } from 'lucide-react';
import { Alert } from '../types';

interface AlertFeedProps {
    alerts: Alert[];
}

const AlertFeed: React.FC<AlertFeedProps> = ({ alerts }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of alerts (or top if we want newest first, let's do newest top)
    // Actually, newest usually go to top in feeds.
    
    return (
        <div className="bg-[#0c0c0e] border border-zinc-800 rounded-lg overflow-hidden mb-6 shadow-lg shadow-black/50">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-xs font-black text-text-primary uppercase tracking-widest">EMERGENT THREAT STREAM</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></div>
                   <span className="text-[10px] font-mono text-zinc-500 font-bold">LIVE WIRE</span>
                </div>
            </div>
            <div className="flex flex-col max-h-[120px] overflow-y-auto custom-scrollbar" ref={scrollRef}>
                {alerts.length === 0 ? (
                    <div className="px-4 py-3 text-xs text-zinc-600 font-mono text-center">NO ACTIVE THREATS DETECTED</div>
                ) : (
                    alerts.slice(0, 5).map((alert) => (
                        <div key={alert.id} className="flex items-center px-4 py-2 border-b border-zinc-900/50 last:border-0 hover:bg-zinc-900/20 transition-colors animate-in slide-in-from-top-2 duration-300">
                            <div className="w-16 text-[10px] font-mono text-zinc-600 text-right mr-4 shrink-0">{alert.time}</div>
                            <div className="mr-4 shrink-0">
                                {alert.type === 'CRITICAL' && <Siren className="w-4 h-4 text-danger animate-pulse" />}
                                {alert.type === 'WARNING' && <ShieldAlert className="w-4 h-4 text-omega" />}
                                {alert.type === 'EXECUTION' && <Zap className="w-4 h-4 text-primary" />}
                                {alert.type === 'OPPORTUNITY' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className={`text-[10px] font-bold mr-2 ${
                                    alert.type === 'CRITICAL' ? 'text-danger' : 
                                    alert.type === 'WARNING' ? 'text-omega' :
                                    alert.type === 'OPPORTUNITY' ? 'text-emerald-500' : 'text-zinc-400'
                                }`}>
                                    [{alert.type}]
                                </span>
                                <span className="text-xs font-mono text-zinc-300 truncate">{alert.msg}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlertFeed;
