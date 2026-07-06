import React from "react";
import { 
  LayoutDashboard, 
  Grid2X2, 
  Flame, 
  Cpu, 
  Sliders, 
  Activity,
  Terminal
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cognitiveLoad: number;
  streakCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, cognitiveLoad, streakCount }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard },
    { id: "matrix", label: "PRIORITY CORE", icon: Grid2X2 },
    { id: "habits", label: "HABIT STREAKS", icon: Flame, badge: streakCount > 0 ? `${streakCount}d` : undefined },
    { id: "coach", label: "COGNITIVE AI", icon: Cpu },
    { id: "settings", label: "DEVICES & API", icon: Sliders },
  ];

  return (
    <div className="w-64 bg-slate-950/80 border-r border-violet-500/10 flex flex-col justify-between h-screen sticky top-0 backdrop-blur-xl z-20" id="aetheris-sidebar">
      {/* Brand Header */}
      <div className="p-6 border-b border-violet-500/10">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 p-0.5 glow-purple">
            <div className="w-full h-full bg-slate-950 rounded-md flex items-center justify-center">
              <Activity className="w-4 h-4 text-violet-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-300 text-sm">
              AETHERIS AI
            </h1>
            <span className="font-mono text-[10px] text-violet-400/60 uppercase tracking-widest">
              Cognitive Node
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Deck */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            Control Operations
          </span>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 group relative ${
                isActive
                  ? "bg-violet-600/10 text-violet-300 border border-violet-500/20 glow-purple"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-violet-400" : "text-slate-500 group-hover:text-violet-400"
                }`} />
                <span>{item.label}</span>
              </div>
              
              {/* Badge indicator */}
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-pink-500/20 border border-pink-500/30 text-pink-400 animate-pulse">
                  {item.badge}
                </span>
              )}

              {/* Glowing active tab border highlight */}
              {isActive && (
                <div className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-md bg-gradient-to-b from-violet-400 to-pink-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Metrics Panel */}
      <div className="p-4 border-t border-violet-500/10 bg-slate-950/40">
        <div className="glassmorphic p-3.5 rounded-lg border border-violet-500/10">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-[10px] text-slate-400 tracking-wider">COGNITIVE LOAD</span>
            <span className="font-mono text-[10px] text-violet-400 font-bold">{cognitiveLoad}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full bg-gradient-to-r ${
                cognitiveLoad > 75 
                  ? "from-pink-500 to-rose-600 animate-pulse" 
                  : cognitiveLoad > 45 
                  ? "from-violet-500 to-pink-500" 
                  : "from-cyan-500 to-violet-500"
              }`}
              style={{ width: `${Math.min(cognitiveLoad, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <div className="flex items-center space-x-1.5">
              <Terminal className="w-3 h-3 text-slate-500" />
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wide">STATUS</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping mr-1" />
              OPTIMIZED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
