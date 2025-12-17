
import React, { useState } from 'react';
import { 
  Diamond, 
  Gauge, 
  Wind, 
  Shield, 
  Settings, 
  History, 
  Bot,
  Activity,
  Layers,
  Search,
  Radar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isCollapsed, setIsCollapsed }) => {
  
  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <li>
      <button 
        onClick={() => onNavigate(id)}
        title={isCollapsed ? label : ''}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2 rounded-md transition-all duration-200 group ${
          currentView === id 
            ? 'bg-zinc-800 text-white shadow-[0_0_10px_rgba(0,0,0,0.5)]' 
            : 'text-text-secondary hover:bg-zinc-800/50 hover:text-white'
        }`}
      >
        <Icon className={`w-4 h-4 ${!isCollapsed && 'mr-3'} ${currentView === id ? 'text-primary' : 'text-text-muted group-hover:text-text-secondary'}`} />
        {!isCollapsed && <span className="font-medium text-xs truncate">{label}</span>}
      </button>
    </li>
  );

  return (
    <aside 
      className={`${isCollapsed ? 'w-[60px]' : 'w-[260px]'} bg-bg-card border-r border-zinc-800 h-screen fixed z-50 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className={`flex items-center h-16 ${isCollapsed ? 'justify-center' : 'px-6'} border-b border-zinc-800 relative`}>
        <Zap className={`w-6 h-6 text-convergence transition-all duration-300 ${isCollapsed ? 'scale-110' : 'mr-3'}`} />
        {!isCollapsed && (
          <span className="text-lg font-bold tracking-tight text-text-primary animate-in fade-in duration-300">
            DIVERGENCE
          </span>
        )}
        
        {/* Collapse Toggle */}
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-zinc-900 border border-zinc-700 rounded-full p-1 text-text-muted hover:text-white z-50 shadow-lg"
        >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-2 no-scrollbar">
        {!isCollapsed && <div className="mb-2 px-3 text-[10px] font-bold text-text-muted uppercase tracking-widest animate-in fade-in">Analytics</div>}
        <ul className="space-y-1 mb-6">
            <NavItem id="dashboard" icon={Gauge} label="Dashboard" />
            <NavItem id="valkyrie" icon={Radar} label="Valkyrie Espionage" />
            <NavItem id="orderbook" icon={BookOpen} label="Nexus Order Book" />
            <NavItem id="scanner" icon={Search} label="Market Scanner" />
            <NavItem id="advanced" icon={Layers} label="Playbooks & Edge" />
            <NavItem id="netflow" icon={Activity} label="Netflow Monitor" />
            <NavItem id="zones" icon={Wind} label="Liquidity Zones" />
        </ul>

        {!isCollapsed && <div className="mb-2 px-3 text-[10px] font-bold text-text-muted uppercase tracking-widest animate-in fade-in">Execution</div>}
        <ul className="space-y-1">
            <NavItem id="risk" icon={Shield} label="Risk Manager" />
            <NavItem id="algo" icon={Bot} label="Algo Config" />
            <NavItem id="journal" icon={History} label="Trade Journal" />
            <NavItem id="system" icon={Settings} label="System Config" />
        </ul>
      </nav>

      {/* Footer Status */}
      <div className={`p-4 border-t border-zinc-800 bg-zinc-900/30 overflow-hidden ${isCollapsed ? 'px-2' : ''}`}>
        <div className="space-y-3">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} text-xs`}>
            {!isCollapsed ? (
                <div className="flex items-center gap-2 w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="text-text-muted font-bold mr-auto">System</span>
                    {/* Tiny Sparkline SVG */}
                    <svg width="40" height="16" viewBox="0 0 40 16" className="opacity-50">
                        <path d="M0 10 L5 12 L10 8 L15 11 L20 6 L25 9 L30 4 L35 7 L40 2" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                    </svg>
                    <span className="font-mono text-emerald-500 font-bold ml-2">ONLINE</span>
                </div>
            ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online"></span>
            )}
          </div>
          
          {!isCollapsed && (
              <div className="space-y-1.5 animate-in fade-in">
                <div className="flex justify-between text-[10px] text-text-secondary">
                <span>Memory Crystal</span>
                <span>100%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full"></div>
                </div>
            </div>
          )}

          {!isCollapsed && (
            <div className="pt-2 flex gap-2 animate-in fade-in">
                <div className="flex-1 bg-zinc-800 rounded p-1.5 text-center">
                    <div className="text-[10px] text-text-muted">TITANS</div>
                    <div className="text-xs font-mono font-bold">9/9</div>
                </div>
                <div className="flex-1 bg-zinc-800 rounded p-1.5 text-center">
                    <div className="text-[10px] text-text-muted">LATENCY</div>
                    <div className="text-xs font-mono font-bold text-emerald-500">12ms</div>
                </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
