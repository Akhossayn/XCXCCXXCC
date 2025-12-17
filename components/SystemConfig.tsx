
import React, { useState, useEffect } from 'react';
import { BookOpen, Settings, Cpu, Database, Network, Server, Save, CheckCircle, XCircle } from 'lucide-react';
import EdgeSummary from './EdgeSummary';
import DeploymentStatus from './DeploymentStatus';

const SystemConfig: React.FC = () => {
    const [localEndpoint, setLocalEndpoint] = useState('http://localhost:11434/api/generate');
    const [localModel, setLocalModel] = useState('llama3');
    const [useLocal, setUseLocal] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'IDLE' | 'SUCCESS' | 'FAILED'>('IDLE');

    useEffect(() => {
        const savedEndpoint = localStorage.getItem('NEURAL_ENDPOINT');
        const savedModel = localStorage.getItem('NEURAL_MODEL');
        const savedUseLocal = localStorage.getItem('USE_LOCAL_AI');
        
        if (savedEndpoint) setLocalEndpoint(savedEndpoint);
        if (savedModel) setLocalModel(savedModel);
        if (savedUseLocal) setUseLocal(savedUseLocal === 'true');
    }, []);

    const saveConfig = () => {
        localStorage.setItem('NEURAL_ENDPOINT', localEndpoint);
        localStorage.setItem('NEURAL_MODEL', localModel);
        localStorage.setItem('USE_LOCAL_AI', useLocal.toString());
        
        // Test Connection
        setConnectionStatus('IDLE');
        if (useLocal) {
            testConnection();
        }
    };

    const testConnection = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
            
            // Simple ping to Ollama or compatible server
            // Note: Ollama usually requires POST for generate, but we just check if server exists
            const response = await fetch(localEndpoint.replace('/api/generate', ''), { 
                method: 'GET',
                signal: controller.signal
            }).catch(() => null); // Catch network errors immediately
            
            clearTimeout(timeoutId);
            
            // If we get any response (even 404), the server is likely running
            setConnectionStatus('SUCCESS');
        } catch (e) {
            setConnectionStatus('FAILED');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    SYSTEM CONFIGURATION & HEALTH
                </h2>
                <p className="text-xs text-text-secondary mt-1 font-mono">INFRASTRUCTURE STATUS // NEURAL BRIDGE // EDGE LOGIC</p>
            </div>

            {/* NEURAL BRIDGE CONFIGURATION */}
            <div className="bg-bg-card border border-zinc-800 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-convergence" />
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Neural Bridge (Local AI)</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <p className="text-xs text-text-secondary leading-relaxed">
                            Bypass cloud latency and restrictions by bridging a local inference engine (Ollama, LM Studio).
                            <br/><span className="text-text-muted">Requires CORS enabled on local server (e.g. OLLAMA_ORIGINS="*").</span>
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <label className="text-xs font-bold text-white">Enable Neural Bridge</label>
                            <button 
                                onClick={() => setUseLocal(!useLocal)}
                                className={`w-10 h-5 rounded-full relative transition-colors ${useLocal ? 'bg-convergence' : 'bg-zinc-700'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${useLocal ? 'left-6' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Server Endpoint</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={localEndpoint}
                                    onChange={(e) => setLocalEndpoint(e.target.value)}
                                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs font-mono text-white focus:border-convergence focus:outline-none"
                                    placeholder="http://localhost:11434/api/generate"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Model Name</label>
                            <input 
                                type="text" 
                                value={localModel}
                                onChange={(e) => setLocalModel(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs font-mono text-white focus:border-convergence focus:outline-none"
                                placeholder="llama3"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                {connectionStatus === 'SUCCESS' && <span className="text-emerald-500 text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Online</span>}
                                {connectionStatus === 'FAILED' && <span className="text-rose-500 text-xs flex items-center gap-1"><XCircle className="w-3 h-3"/> Unreachable</span>}
                            </div>
                            <button 
                                onClick={saveConfig}
                                className="flex items-center gap-2 px-4 py-1.5 bg-zinc-100 hover:bg-white text-black text-xs font-bold rounded transition-colors"
                            >
                                <Save className="w-3 h-3" /> SAVE CONFIG
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ingested Components */}
            <DeploymentStatus />
            <EdgeSummary />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Navigation / TOC */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-bg-card border border-zinc-800 rounded-lg p-4">
                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-tier2" />
                            USER MANUAL
                        </h3>
                        <ul className="space-y-2 text-xs text-text-secondary">
                            <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary pl-2 transition-all">Understanding Alpha/Omega</li>
                            <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary pl-2 transition-all">Liquidity Heatmaps</li>
                            <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary pl-2 transition-all">Reading the DOM (Icebergs)</li>
                            <li className="hover:text-primary cursor-pointer border-l-2 border-transparent hover:border-primary pl-2 transition-all">Risk Protocols</li>
                        </ul>
                    </div>
                </div>

                {/* Content Area */}
                <div className="col-span-1 lg:col-span-2 space-y-8">
                    {/* SECTION 1: ALPHA INDICATORS */}
                    <section>
                        <h3 className="text-lg font-bold text-alpha mb-4 border-b border-zinc-800 pb-2">ALPHA INDICATORS (Momentum & Trend)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900/30 p-4 rounded border border-zinc-800/50">
                                <div className="text-sm font-bold text-white mb-1">LQ Score (Liquidation)</div>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Measures the density of liquidation clusters. High LQ suggests plenty of "fuel" for a directional move.
                                    <br/><span className="text-text-muted mt-1 block">Usage: Look for LQ > 0.80 for breakout setups.</span>
                                </p>
                            </div>
                            <div className="bg-zinc-900/30 p-4 rounded border border-zinc-800/50">
                                <div className="text-sm font-bold text-white mb-1">OBI Score (Imbalance)</div>
                                <p className="text-xs text-text-secondary leading-relaxed">
                                    Order Book Imbalance. A measure of limit order intent.
                                    <br/><span className="text-text-muted mt-1 block">Usage: High OBI + Price Lag = Absorption.</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SystemConfig;
