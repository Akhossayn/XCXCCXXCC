
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Play, RefreshCw, Scale, Search, Clock, Sparkles, Brain, Activity, ChevronDown, Zap, Shield, Cpu, BookOpen, Mic, Network } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Sidebar from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import LandingPage from './components/LandingPage';
import ConvergenceVisualizer from './components/ConvergenceVisualizer';
import ExecutionFramework from './components/ExecutionFramework';
import WeightingMatrix from './components/WeightingMatrix';
import CorrelationMatrix from './components/CorrelationMatrix';
import AdvancedTechniques from './components/AdvancedTechniques';
import SystemConfig from './components/SystemConfig';
import MarketScanner from './components/MarketScanner';
import ValkyrieEspionage from './components/ValkyrieEspionage';
import LiquidityWalls from './components/LiquidityWalls';
import LiquidityAnalytics from './components/LiquidityAnalytics';
import NetflowMonitor from './components/NetflowMonitor';
import CascadeConfluence from './components/CascadeConfluence';
import ConfluenceJudgment from './components/ConfluenceJudgment';
import AlertFeed from './components/AlertFeed';
import BackgroundVideo from './components/BackgroundVideo';
import RiskManager from './components/RiskManager';
import AlgoConfig from './components/AlgoConfig';
import TradeJournal from './components/TradeJournal';
import GeminiLiveOracle from './components/GeminiLiveOracle'; 
import { MetricData, LiquidityWall, Alert, TowerData } from './types';

// --- DATA ENGINE CONFIG ---
const POINTS = 40;

const initialHistory = (val: number, spread: number) => 
    Array.from({ length: POINTS }, (_, i) => ({ 
        value: val + (Math.random() - 0.5) * spread 
    }));

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false); 
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [currentView, setCurrentView] = useState('dashboard');
  const [timeframe, setTimeframe] = useState<'LIVE' | '15M' | '1H' | '4H'>('LIVE');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // --- MARKET ENGINE STATE ---
  const [price, setPrice] = useState(98450.50);
  const [tick, setTick] = useState(0); 
  const [isOracleActive, setIsOracleActive] = useState(false); 

  // Alerts State
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Valkyrie State
  const [valkyrieState, setValkyrieState] = useState({
      towers: [
          { name: 'BINANCE', align: 98, status: 'SYNCED', bias: 'LONG', cvd: '+120M' },
          { name: 'BYBIT', align: 96, status: 'SYNCED', bias: 'LONG', cvd: '+85M' },
          { name: 'COINBASE', align: 92, status: 'SYNCED', bias: 'NEUTRAL', cvd: '-12M' },
          { name: 'HYPERLIQUID', align: 65, status: 'LAGGING', bias: 'SHORT', cvd: '-45M' }
      ] as TowerData[],
      syncIndex: 88.7,
      trapRisk: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
      genProb: 82.0
  });

  // 13 Indicator State
  const [indicators, setIndicators] = useState({
      fuel: { value: 0.85, history: initialHistory(0.85, 0.05) },
      ifa: { value: 0.72, history: initialHistory(0.72, 0.1) },
      oi: { value: 2.1, history: initialHistory(2.1, 0.2) },
      spring: { value: 0.92, history: initialHistory(0.92, 0.05) },
      pressure: { value: 0.84, history: initialHistory(0.84, 0.1) },
      cvd: { value: 0.65, history: initialHistory(0.65, 0.15) },
      whale: { value: 0.75, history: initialHistory(0.75, 0.1) },
      funding: { value: 0.01, history: initialHistory(0.01, 0.005) },
      inflection: { value: 1.5, history: initialHistory(1.5, 0.3) },
      obi: { value: 0.65, history: initialHistory(0.65, 0.1) },
      lq_score: { value: 0.80, history: initialHistory(0.80, 0.05) }, // Explicit LQ
      basis: { value: 0.002, history: initialHistory(0.002, 0.001) },
      sonar: { value: 0.88, history: initialHistory(0.88, 0.02) }
  });

  // Derived Confluence State
  const [confluenceScore, setConfluenceScore] = useState(82.5);
  const [optimalCount, setOptimalCount] = useState(10);
  
  // Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSource, setAnalysisSource] = useState<'LOCAL' | 'GEMINI-3' | 'GEMINI-2.5' | null>(null);

  // --- MASTER ENGINE LOOP (500ms) ---
  useEffect(() => {
    const interval = setInterval(() => {
        setTick(t => t + 1);

        // 1. Price Drift (Random Walk)
        const vol = timeframe === 'LIVE' ? 15.5 : 55.0;
        setPrice(p => p + (Math.random() - 0.5) * vol);

        // 2. Update Indicators with specific behaviors
        setIndicators(prev => {
            const update = (key: keyof typeof prev, volatility: number, trend: number = 0) => {
                const last = prev[key].value;
                let next = last + (Math.random() - 0.5) * volatility + trend;
                // Clamp roughly 0-1 for most, others specific
                if (key === 'oi') next = Math.max(0, Math.min(5, next));
                else if (key === 'funding') next = Math.max(-0.05, Math.min(0.05, next));
                else next = Math.max(0, Math.min(1, next)); // Default normalized
                
                const newHistory = [...prev[key].history.slice(1), { value: next }];
                return { value: next, history: newHistory };
            };

            const newState = {
                fuel: update('fuel', 0.02),
                ifa: update('ifa', 0.01, 0.001), // Slow trend up
                oi: update('oi', 0.05),
                spring: update('spring', 0.03),
                pressure: update('pressure', 0.04),
                cvd: update('cvd', 0.06), // Volatile
                whale: update('whale', 0.02),
                funding: update('funding', 0.001),
                inflection: update('inflection', 0.05),
                obi: update('obi', 0.03),
                lq_score: update('lq_score', 0.01),
                basis: update('basis', 0.0005),
                sonar: update('sonar', 0.01)
            };

            // 3. Logic Check for Alerts
            const newAlerts = [...alerts];
            const now = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }) + `.${Math.floor(Math.random()*999)}`;
            
            // Trigger: CVD Divergence
            if (newState.cvd.value < 0.4 && price > 98000 && Math.random() > 0.95) {
                newAlerts.unshift({ id: Date.now().toString(), time: now, type: 'WARNING', msg: 'CVD DIVERGENCE: Price Highs vs CVD Lows' });
            }
            // Trigger: Spoofing (Random for demo)
            if (Math.random() > 0.98) {
                newAlerts.unshift({ id: Date.now().toString(), time: now, type: 'CRITICAL', msg: 'SPOOF DETECTED: 450 BTC Bid Vanished' });
            }
             // Trigger: Opportunity
            if (newState.ifa.value > 0.8 && newState.whale.value > 0.8 && Math.random() > 0.95) {
                newAlerts.unshift({ id: Date.now().toString(), time: now, type: 'OPPORTUNITY', msg: 'WHALE ACCUMULATION: Institutional Zone' });
            }
            if (newAlerts.length > 20) newAlerts.pop();
            setAlerts(newAlerts);

            // 4. Calculate Confluence
            let score = 0;
            let count = 0;
            // Define "Optimal" zones
            if (newState.fuel.value > 0.7) { score += 1; count++; }
            if (newState.ifa.value > 0.6) { score += 1; count++; }
            if (newState.oi.value > 1.5 && newState.oi.value < 2.5) { score += 1; count++; } // Goldilocks zone
            if (newState.spring.value > 0.8) { score += 1; count++; }
            if (newState.pressure.value > 0.7) { score += 1; count++; }
            if (newState.cvd.value > 0.5) { score += 1; count++; }
            if (newState.whale.value > 0.6) { score += 1; count++; }
            if (Math.abs(newState.funding.value) < 0.02) { score += 1; count++; } // Neutral funding
            if (newState.inflection.value > 1.0) { score += 1; count++; }
            if (newState.obi.value > 0.6) { score += 1; count++; }
            if (newState.lq_score.value > 0.7) { score += 1; count++; }
            if (newState.basis.value > 0) { score += 1; count++; }
            if (newState.sonar.value > 0.8) { score += 1; count++; }

            const finalScore = (score / 13) * 100;
            setConfluenceScore(finalScore);
            setOptimalCount(count);

            // 5. Update Valkyrie
            setValkyrieState(prev => ({
                ...prev,
                syncIndex: prev.syncIndex + (Math.random() - 0.5),
                genProb: finalScore * 0.9 + (Math.random() * 5),
                trapRisk: newState.basis.value < -0.001 ? 'HIGH' : newState.basis.value < 0 ? 'MEDIUM' : 'LOW',
                towers: prev.towers.map(t => ({
                    ...t,
                    align: Math.min(100, Math.max(0, t.align + (Math.random() - 0.5) * 5)),
                    cvd: t.name === 'HYPERLIQUID' ? '-45M' : `+${Math.floor(100 + Math.random() * 50)}M` // Keep hyperliquid bearish for contrast
                }))
            }));

            return newState;
        });

    }, 500); 
    return () => clearInterval(interval);
  }, [timeframe, alerts]); // Dependencies


  // --- ORDER BOOK GENERATOR (BREATHING) ---
  const walls = useMemo(() => {
    const generateWalls = (currentPrice: number, spreadFactor: number): LiquidityWall[] => {
        const walls: LiquidityWall[] = [];
        const spread = spreadFactor; 
        for(let i=1; i<=25; i++) {
            // Independent volume jitter per wall based on Tick
            const volBase = Math.abs(Math.sin(tick * 0.1 + i)) * 100 + 50; 
            const vol = volBase + (Math.random() * 20);
            
            const isSpoof = Math.random() > 0.9;
            const spoofVol = isSpoof ? vol * 0.4 : 0; 

            walls.push({ id: `ask-${i}`, price: currentPrice + (i * spread), volume: vol, cumulative_vol: 0, type: 'ASK', spoofed_volume: spoofVol, hidden_volume: Math.random() > 0.95 ? vol*2 : 0, is_dark: false, is_void: false, aggressor_vol: 0 });
            walls.push({ id: `bid-${i}`, price: currentPrice - (i * spread), volume: vol, cumulative_vol: 0, type: 'BID', spoofed_volume: spoofVol, hidden_volume: Math.random() > 0.95 ? vol*2 : 0, is_dark: false, is_void: false, aggressor_vol: 0 });
        }
        return walls.sort((a,b) => b.price - a.price);
    };
    let spread = 0.5;
    if (selectedPair.includes('BTC')) spread = 5.0;
    if (selectedPair.includes('ETH')) spread = 0.5;
    return generateWalls(price, spread);
  }, [price, selectedPair, tick]); 

  const activePlaybook = useMemo(() => {
      const lastIFA = indicators.ifa.value;
      const lastOI = indicators.oi.value;
      const lastCVD = indicators.cvd.value;

      if (lastIFA > 0.8 && lastCVD > 0.7) return { name: 'MOMENTUM BREAKOUT', color: 'text-emerald-500', icon: Zap };
      if (lastIFA < 0.5 && lastOI > 2.2) return { name: 'LIQUIDITY CASCADE', color: 'text-rose-500', icon: Activity };
      if (lastOI < 1.8 && lastCVD > 0.5) return { name: 'ABSORPTION REVERSAL', color: 'text-amber-500', icon: Shield };
      return { name: 'RANGE ACCUMULATION', color: 'text-blue-500', icon: Scale };
  }, [indicators]);

  const metricsData: MetricData[] = useMemo(() => {
    return [
        { id: 'fuel', title: 'FUEL GAUGE', type: 'POWER_ALPHA', tag: 'ALP', value: indicators.fuel.value, displayValue: `${(indicators.fuel.value * 100).toFixed(0)}%`, unit: 'LIQ DENSITY', description: 'Liquidation Cluster Density', chartType: 'gauge', chartData: [] },
        { id: 'ifa', title: 'IFA FLOW', type: 'POWER_ALPHA', tag: 'ALP', value: indicators.ifa.value, displayValue: `+${(indicators.ifa.value * 1200).toFixed(0)} BTC`, unit: 'INSTITUTIONAL', description: 'Institutional Flow Algo', chartType: 'area', chartData: indicators.ifa.history },
        { id: 'oi', title: 'OI DELTA', type: 'OMEGA', tag: 'OME', value: indicators.oi.value / 3, displayValue: `+${indicators.oi.value.toFixed(2)}M`, unit: 'RETAIL TRAP', description: 'Open Interest Delta (30m)', chartType: 'area', chartData: indicators.oi.history },
        { id: 'spring', title: 'SPRING COIL', type: 'ACCELERATION', tag: 'ACC', value: indicators.spring.value, displayValue: `${(indicators.spring.value * 10).toFixed(1)}`, unit: 'TENSION', description: 'Volatility Compression', chartType: 'gauge', chartData: [] },
        { id: 'pressure', title: 'PRESSURE RPM', type: 'ACCELERATION', tag: 'ACC', value: indicators.pressure.value, displayValue: 'HIGH', unit: 'VELOCITY', description: 'Kinetic Energy Build', chartType: 'gauge', chartData: [] },
        { id: 'cvd_vel', title: 'CVD VELOCITY', type: 'POWER_ALPHA', tag: 'ALP', value: indicators.cvd.value, displayValue: `${(indicators.cvd.value * 100).toFixed(0)}`, unit: 'ABSORPTION', description: 'Cumulative Volume Delta', chartType: 'area', chartData: indicators.cvd.history },
        { id: 'whale', title: 'WHALE ABSORP', type: 'POWER_ALPHA', tag: 'ALP', value: indicators.whale.value, displayValue: 'ACCUM', unit: 'NETFLOW', description: 'Large Wallet Netflow', chartType: 'area', chartData: indicators.whale.history },
        { id: 'funding', title: 'FUNDING ARB', type: 'OMEGA', tag: 'OME', value: 0.2, displayValue: `${(indicators.funding.value * 100).toFixed(4)}%`, unit: 'BASIS', description: 'Cross-Exchange Funding', chartType: 'bar', chartData: indicators.funding.history },
        { id: 'inflection', title: 'INFLECTION', type: 'ACCELERATION', tag: 'ACC', value: 0.75, displayValue: `${indicators.inflection.value.toFixed(1)}σ`, unit: 'CURVATURE', description: 'Trend Acceleration', chartType: 'area', chartData: indicators.inflection.history },
        { id: 'obi_trend', title: 'OBI TREND', type: 'ALPHA', tag: 'ALP', value: indicators.obi.value, displayValue: indicators.obi.value.toFixed(2), unit: 'SKEW', description: 'Order Book Imbalance', chartType: 'area', chartData: indicators.obi.history },
        // Add additional if view needs them, but standard grid is 10. We have 13 tracked.
    ];
  }, [indicators]);

  // --- NEURAL BRIDGE ANALYSIS ENGINE ---
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    setAnalysisSource(null);

    const prompt = `Analyze this market snapshot for ${selectedPair}. Price: ${price.toFixed(2)}. Confluence Score: ${confluenceScore.toFixed(1)}. Focus on Liquidation Cascades and Retail Traps. Short tactical response.`;
    
    // 1. TRY LOCAL AI FIRST
    const useLocal = localStorage.getItem('USE_LOCAL_AI') === 'true';
    if (useLocal) {
        try {
            const endpoint = localStorage.getItem('NEURAL_ENDPOINT') || 'http://localhost:11434/api/generate';
            const model = localStorage.getItem('NEURAL_MODEL') || 'llama3';
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: model,
                    prompt: prompt,
                    stream: false
                })
            });
            
            const data = await response.json();
            if (data.response) {
                setAiAnalysis(data.response);
                setAnalysisSource('LOCAL');
                setIsAnalyzing(false);
                return; // Exit if Local success
            }
        } catch (e) {
            console.warn("Local Bridge Failed. Switching to Gemini Fallback.");
        }
    }

    // 2. TRY GEMINI 3 PRO (Standard)
    if (!process.env.API_KEY) {
        setAiAnalysis("ERR: API_KEY_MISSING. CHECK ENV.");
        setIsAnalyzing(false);
        return;
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const result = await ai.models.generateContent({ model: "gemini-3-pro-preview", contents: prompt });
        setAiAnalysis(result.text || "No response generated.");
        setAnalysisSource('GEMINI-3');
    } catch (e) {
        console.warn("Gemini 3 Failed. Fallback to Gemini 2.5.");
        
        // 3. FALLBACK TO GEMINI 2.5
        try {
            const fallbackResult = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
            setAiAnalysis(fallbackResult.text || "No response generated (Fallback).");
            setAnalysisSource('GEMINI-2.5');
        } catch (finalError) {
            setAiAnalysis("ERR: ALL NEURAL LINKS FAILED.");
        }
    } finally {
        setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    switch(currentView) {
      case 'scanner': return <MarketScanner pair={selectedPair} timeframe={timeframe} />;
      case 'netflow': return <NetflowMonitor />;
      case 'advanced': return <AdvancedTechniques />;
      case 'system': return <SystemConfig />;
      case 'valkyrie': return (
          <ValkyrieEspionage 
            towers={valkyrieState.towers}
            syncIndex={valkyrieState.syncIndex}
            trapRisk={valkyrieState.trapRisk}
            genProb={valkyrieState.genProb}
          />
      );
      case 'zones': return <LiquidityAnalytics price={price} />;
      case 'risk': return <RiskManager />;
      case 'algo': return <AlgoConfig />;
      case 'journal': return <TradeJournal />;
      case 'orderbook':
        return (
          <div className="h-[800px] animate-in fade-in">
            <LiquidityWalls 
                walls={walls} 
                currentPrice={price} 
                imbalance={indicators.obi.value} 
                cvd={indicators.cvd.value} 
                timeframe={timeframe} 
            />
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="animate-in fade-in duration-300">
            {/* ALERT FEED */}
            <AlertFeed alerts={alerts} />

            {/* LIVE TELEMETRY CARDS */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3 px-1 border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Live Telemetry</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600">SYNC: {Math.floor(tick * 3.14)} // TICK: {tick}</div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                    {metricsData.map((metric) => (
                        <MetricCard key={metric.id} data={metric} />
                    ))}
                </div>
            </div>

            <div className="mb-2 text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Convergence Engine</div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              
              {/* CONFLUENCE JUDGMENT */}
              <ConfluenceJudgment 
                  score={confluenceScore}
                  optimalCount={optimalCount}
                  totalIndicators={13}
              />

              {/* CONVERGENCE VISUALIZER & LIVE ORACLE */}
              <div className="col-span-1 lg:col-span-2 bg-bg-card rounded-lg border border-zinc-800 p-5 relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-text-primary">
                    <Scale className="w-4 h-4 text-zinc-500" />
                    ALPHA-OMEGA CONVERGENCE
                  </h2>
                  <div className="flex gap-2">
                    <button 
                        onClick={runAnalysis}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-convergence text-xs font-bold rounded hover:bg-zinc-800 transition-all disabled:opacity-50"
                    >
                        {isAnalyzing ? <Sparkles className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3" />}
                        {isAnalyzing ? 'COMPUTING...' : 'ORACLE ANALYSIS'}
                    </button>
                    <button 
                        onClick={() => setIsOracleActive(true)}
                        className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-tier2 text-xs font-bold rounded hover:bg-zinc-800 transition-all"
                    >
                        <Mic className="w-3 h-3" />
                        VALKYRIE VOICE
                    </button>
                  </div>
                </div>
                
                {aiAnalysis && (
                   <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 animate-in fade-in">
                        <div className="w-full max-w-lg bg-zinc-900 border border-convergence/30 rounded-xl p-6 relative">
                            <button onClick={() => setAiAnalysis(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                                <span className="sr-only">Close</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <div className="text-convergence font-bold text-lg mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2">
                                <Sparkles className="w-5 h-5" /> STRATEGY OUTPUT
                                {analysisSource && (
                                    <span className={`ml-auto text-[9px] px-2 py-0.5 rounded border ${
                                        analysisSource === 'LOCAL' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                                        analysisSource === 'GEMINI-3' ? 'bg-convergence/10 text-convergence border-convergence/20' :
                                        'bg-zinc-700 text-zinc-400 border-zinc-600'
                                    }`}>
                                        VIA {analysisSource}
                                    </span>
                                )}
                            </div>
                            <div className="font-mono text-sm space-y-2 text-slate-300 h-64 overflow-y-auto custom-scrollbar">
                                {aiAnalysis.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                            </div>
                        </div>
                   </div>
                )}
                
                {/* LIVE ORACLE MODAL OVERLAY */}
                {isOracleActive && (
                    <GeminiLiveOracle 
                        priceContext={price} 
                        onClose={() => setIsOracleActive(false)} 
                    />
                )}

                <ConvergenceVisualizer score={confluenceScore} />
                
                <div className="mt-4 flex gap-4">
                   <div className="flex-1 bg-zinc-900/50 p-3 rounded border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-500 uppercase">Convergence State</div>
                      <div className="text-lg font-bold text-convergence mt-1 font-mono">
                          {confluenceScore > 80 ? 'TIER 1 ALIGNMENT' : confluenceScore > 50 ? 'TIER 2 ALIGNMENT' : 'DECOUPLED'}
                      </div>
                   </div>
                   <div className="flex-1 bg-zinc-900/50 p-3 rounded border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-500 uppercase">Leverage Auth</div>
                      <div className="text-lg font-bold text-white mt-1 font-mono">
                          {confluenceScore > 80 ? 'AUTHORIZED (5x)' : confluenceScore > 60 ? 'AUTHORIZED (2x)' : 'DENIED'}
                      </div>
                   </div>
                </div>
              </div>

              {/* CASCADE GENERATOR */}
              <CascadeConfluence 
                 lqScore={indicators.fuel.value}
                 obiScore={indicators.ifa.value}
                 pressureScore={indicators.pressure.value}
              />
              
              <CorrelationMatrix />
            </div>
          </div>
        );
    }
  };

  if (!hasStarted) {
    return (
      <>
        <BackgroundVideo />
        <LandingPage onBegin={() => setHasStarted(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-950/85 text-text-primary font-sans relative z-10 animate-in fade-in duration-1000">
      <BackgroundVideo />
      
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarCollapsed ? 'ml-[60px]' : 'md:ml-[260px]'} overflow-x-hidden flex flex-col min-h-screen`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-zinc-800 gap-4">
          <div className="flex flex-col">
             <div className="flex items-center gap-2 mb-2">
                 <div className="bg-zinc-800 px-2 py-1 rounded border border-zinc-700">
                    <div className="text-[10px] text-zinc-400 font-bold">V2.4.1</div>
                    <div className="text-[10px] text-zinc-500">PROD</div>
                 </div>
                 <div className="bg-zinc-900 px-2 py-1 rounded border border-emerald-500 flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="text-[10px] text-emerald-500 font-bold">REALTIME FEED</div>
                 </div>
             </div>
             <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-mono">DIVERGENCE TERMINAL</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
             <div className="flex items-center gap-2 bg-zinc-900 rounded p-1 border border-zinc-800">
                {(['LIVE', '15M', '1H', '4H'] as const).map((tf) => (
                    <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1.5 text-xs font-bold rounded transition-all flex items-center gap-2 ${timeframe === tf ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}
                    >
                        {tf === 'LIVE' ? <Activity className="w-3 h-3 text-emerald-500" /> : <Clock className="w-3 h-3" />}
                        {tf}
                    </button>
                ))}
             </div>
             
             <div className="flex items-center gap-2">
                 <div className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 flex items-center min-w-[120px]">
                    <Search className="w-3 h-3 text-zinc-600 mr-2" />
                    <select 
                      className="bg-transparent text-sm text-white focus:outline-none appearance-none cursor-pointer w-full font-mono"
                      value={selectedPair}
                      onChange={(e) => setSelectedPair(e.target.value)}
                    >
                      <option>BTC/USDT</option>
                      <option>ETH/USDT</option>
                      <option>SOL/USDT</option>
                      <option>WIF/SOL (Raydium)</option>
                      <option>JUP/USDC</option>
                    </select>
                 </div>
                 
                 <button onClick={() => setPrice(p => p)} className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded text-xs font-bold hover:bg-zinc-800 transition-all uppercase"><RefreshCw className="w-3 h-3" /></button>
                 
                 {/* DYNAMIC STRATEGY ENGINE */}
                 <div className="flex rounded border border-zinc-700/50 overflow-hidden shadow-lg shadow-black/30">
                     <div className="relative bg-zinc-900 border-r border-zinc-800 px-3 py-1.5 flex flex-col justify-center min-w-[140px]">
                        <div className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Active Playbook</div>
                        <div className={`text-xs font-black ${activePlaybook.color} flex items-center gap-1.5`}>
                            <activePlaybook.icon className="w-3 h-3" />
                            {activePlaybook.name}
                        </div>
                     </div>
                     <button className="flex items-center justify-center gap-2 px-4 py-1.5 bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold hover:bg-zinc-700 transition-all uppercase tracking-wide border-l border-zinc-700">
                        <Play className="w-3 h-3 fill-current" /> EXECUTE
                     </button>
                 </div>
             </div>
          </div>
        </div>
        
        <div className="flex-1">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
