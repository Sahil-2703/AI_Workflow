import React, { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  BrainCircuit, 
  CheckCircle, 
  Flame, 
  ChevronRight, 
  Zap,
  Coffee,
  Sparkles
} from "lucide-react";
import { Task, Habit } from "../types";

interface DashboardViewProps {
  tasks: Task[];
  habits: Habit[];
  setActiveTab: (tab: string) => void;
  cognitiveLoad: number;
}

export default function DashboardView({ tasks, habits, setActiveTab, cognitiveLoad }: DashboardViewProps) {
  // Timer States
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState<"flow" | "recharge">("flow");
  const [timerDuration, setTimerDuration] = useState(25 * 60);

  // Quote / Quick Coach Tip state
  const [coachingTip, setCoachingTip] = useState(
    "Calibrating system... For peak neuro-performance, execute your high cognitive weight work in 50-minute blocks followed by brief, screen-free recharges."
  );
  const [isRefreshingTip, setIsRefreshingTip] = useState(false);

  // Active Tasks count and streaks count
  const activeTasks = tasks.filter(t => !t.completed);
  const completedToday = tasks.filter(t => t.completed).length;
  const activeHabitsCount = habits.length;
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streakCount)) : 0;

  // Timer Tick Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            // Timer complete
            setTimerActive(false);
            alert(timerMode === "flow" ? "Flow session completed! Time to recharge." : "Recharge complete! Ready to enter Flow State?");
            handleResetTimer();
          } else {
            setTimerMinutes(prev => prev - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(prev => prev - 1);
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerMinutes, timerSeconds, timerMode]);

  const handleStartStop = () => {
    setTimerActive(!timerActive);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    const mins = timerMode === "flow" ? 25 : 5;
    setTimerMinutes(mins);
    setTimerSeconds(0);
    setTimerDuration(mins * 60);
  };

  const handleSetTimerMode = (mode: "flow" | "recharge", durationMins: number) => {
    setTimerActive(false);
    setTimerMode(mode);
    setTimerMinutes(durationMins);
    setTimerSeconds(0);
    setTimerDuration(durationMins * 60);
  };

  const getPercentageRemaining = () => {
    const totalSecs = timerMinutes * 60 + timerSeconds;
    return (totalSecs / timerDuration) * 100;
  };

  const fetchNewCoachTip = async () => {
    setIsRefreshingTip(true);
    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: `Give me a single 2-sentence highly professional, punchy cognitive optimization tip based on my current cognitive load of ${cognitiveLoad}% and having ${activeTasks.length} active tasks.` }
          ]
        })
      });
      const data = await response.json();
      if (data.content) {
        // Strip simulator prefix if present for clean look
        setCoachingTip(data.content.replace("[Simulation Node] ", ""));
      }
    } catch (err) {
      console.warn("AI tip fetch error:", err);
    } finally {
      setIsRefreshingTip(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in p-2" id="aetheris-dashboard">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display font-semibold text-3xl tracking-tight text-slate-100 flex items-center gap-3">
            System Operations <span className="text-violet-400 font-mono text-sm tracking-widest font-normal bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">v2.5_ACTIVE</span>
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-1">
            Visualizing cognitive throughput and streak crystallization for your operational cycle.
          </p>
        </div>
        
        {/* Status Indicators */}
        <div className="flex items-center space-x-3 text-xs font-mono bg-slate-950/40 p-2.5 rounded-lg border border-violet-500/10">
          <div className="flex items-center space-x-1.5 border-r border-violet-500/10 pr-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400 uppercase">Supabase Offline Fallback</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            <span className="text-slate-400 uppercase">Aetheris-Flash</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Cognitive Bandwidth */}
        <div className="glassmorphic-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <BrainCircuit className="w-24 h-24 text-violet-400" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono text-xs tracking-wider text-slate-400 uppercase block">Cognitive Bandwidth</span>
              <span className="text-4xl font-display font-semibold mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-violet-400">
                {100 - cognitiveLoad}%
              </span>
              <span className="text-xs text-slate-400 mt-2 block">
                {cognitiveLoad > 70 ? "High stress load detected. Outsource tasks." : "Safe operations threshold."}
              </span>
            </div>
            <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20 text-violet-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-violet-500/10 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">CONSUMED LOAD</span>
            <span className="text-violet-400">{cognitiveLoad}/100 POINTS</span>
          </div>
        </div>

        {/* Card 2: Action Queue */}
        <div className="glassmorphic-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle className="w-24 h-24 text-cyan-400" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono text-xs tracking-wider text-slate-400 uppercase block">Action Queue</span>
              <span className="text-4xl font-display font-semibold mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400">
                {activeTasks.length} <span className="text-lg text-slate-500 font-normal">pending</span>
              </span>
              <span className="text-xs text-slate-400 mt-2 block">
                {completedToday} completed today.
              </span>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-violet-500/10 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">VELOCITY SUMMARY</span>
            <button 
              onClick={() => setActiveTab("matrix")}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              LAUNCH CORE <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Streaks Level */}
        <div className="glassmorphic-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flame className="w-24 h-24 text-pink-400" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono text-xs tracking-wider text-slate-400 uppercase block">Habit Crystals</span>
              <span className="text-4xl font-display font-semibold mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-400">
                {bestStreak} <span className="text-lg text-slate-500 font-normal">days max</span>
              </span>
              <span className="text-xs text-slate-400 mt-2 block">
                Tracking {activeHabitsCount} active habit nodes.
              </span>
            </div>
            <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20 text-pink-400">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-violet-500/10 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-500">streak crystallization</span>
            <button 
              onClick={() => setActiveTab("habits")}
              className="text-pink-400 hover:text-pink-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              LOG HABIT <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Center Area: Flow Timer & Cognitive Advice split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pomodoro Flow Engine (7 cols) */}
        <div className="lg:col-span-7 glassmorphic-card p-8 rounded-2xl flex flex-col justify-between" id="flow-timer-engine">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-medium text-lg text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-400 animate-pulse" /> Flow Calibration Engine
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Lock your cognitive matrix into high-focus blocks.
              </p>
            </div>
            
            {/* Quick Modes */}
            <div className="flex bg-slate-950/60 p-1 rounded-lg border border-violet-500/10">
              <button
                onClick={() => handleSetTimerMode("flow", 25)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  timerMode === "flow" && timerDuration === 25 * 60
                    ? "bg-violet-600/20 border border-violet-500/30 text-violet-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Zap className="w-3 h-3" /> 25m Flow
              </button>
              <button
                onClick={() => handleSetTimerMode("flow", 50)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  timerMode === "flow" && timerDuration === 50 * 60
                    ? "bg-violet-600/20 border border-violet-500/30 text-violet-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <BrainCircuit className="w-3 h-3" /> 50m Flow
              </button>
              <button
                onClick={() => handleSetTimerMode("recharge", 5)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  timerMode === "recharge"
                    ? "bg-pink-600/20 border border-pink-500/30 text-pink-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <Coffee className="w-3 h-3" /> 5m Rest
              </button>
            </div>
          </div>

          {/* Central Timer Dial Display */}
          <div className="flex flex-col items-center justify-center my-8">
            <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
              {/* Outer Glowing Circle Border */}
              <div className="absolute inset-0 rounded-full border border-violet-500/5 glow-purple bg-slate-950/40" />
              
              {/* Spinning visual timeline arc (Simulated via SVG) */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="116"
                  stroke="rgba(15, 11, 28, 0.4)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="116"
                  stroke={timerMode === "flow" ? "#8b5cf6" : "#ec4899"}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 116}
                  strokeDashoffset={2 * Math.PI * 116 * (1 - getPercentageRemaining() / 100)}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>

              {/* Glowing Dots */}
              <div className="absolute w-[240px] h-[240px] rounded-full border border-violet-500/5 flex flex-col items-center justify-center">
                <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                  {timerMode === "flow" ? "IN FOCUS STATE" : "RECHARGING PATH"}
                </span>
                <span className="font-display font-bold text-5xl tracking-normal text-slate-100 my-1 font-mono">
                  {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] text-violet-400 tracking-widest font-bold uppercase px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/10 animate-pulse">
                  {timerActive ? "PRODUCING CALM" : "STANDBY NODE"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={handleResetTimer}
              className="p-3 bg-slate-900 border border-violet-500/10 rounded-full text-slate-400 hover:text-slate-100 hover:border-violet-500/30 transition-all duration-300"
              title="Reset timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleStartStop}
              className={`p-5 rounded-full text-slate-950 flex items-center justify-center transition-all duration-300 ${
                timerActive 
                  ? "bg-gradient-to-tr from-pink-500 to-rose-400 hover:shadow-lg glow-pink scale-110" 
                  : "bg-gradient-to-tr from-violet-500 to-indigo-400 hover:shadow-lg glow-purple scale-110"
              }`}
            >
              {timerActive ? (
                <Pause className="w-6 h-6 fill-slate-950 text-slate-950" />
              ) : (
                <Play className="w-6 h-6 fill-slate-950 text-slate-950 ml-1" />
              )}
            </button>
            <button
              onClick={() => handleSetTimerMode(timerMode === "flow" ? "recharge" : "flow", timerMode === "flow" ? 5 : 25)}
              className="p-3 bg-slate-900 border border-violet-500/10 rounded-full text-slate-400 hover:text-slate-100 hover:border-violet-500/30 transition-all duration-300"
              title="Switch modes"
            >
              {timerMode === "flow" ? <Coffee className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Right Column: Dynamic Aetheris Coach Advice (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Dynamic AI Advice Card */}
          <div className="glassmorphic-card p-6 rounded-2xl flex-1 flex flex-col justify-between" id="aetheris-ai-tips">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-violet-400 tracking-wider flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> COGNITIVE RECOMMENDATION
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-violet-500/5">
                  Node 01
                </span>
              </div>
              
              <div className="glassmorphic p-4 rounded-xl border border-violet-500/10 min-h-[140px] flex items-center">
                {isRefreshingTip ? (
                  <div className="flex flex-col items-center justify-center w-full space-y-2">
                    <BrainCircuit className="w-6 h-6 text-violet-400 animate-spin" />
                    <span className="font-mono text-[10px] text-slate-500 tracking-widest animate-pulse">SYNTHESIZING COGNITIVE STATE...</span>
                  </div>
                ) : (
                  <p className="font-sans text-xs text-slate-300 leading-relaxed font-light">
                    {coachingTip}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-violet-500/10 flex justify-between items-center">
              <span className="font-mono text-[9px] text-slate-500">POWERED BY GEMINI-3.5</span>
              <button
                disabled={isRefreshingTip}
                onClick={fetchNewCoachTip}
                className="px-3.5 py-1.5 rounded bg-violet-600/10 hover:bg-violet-600/20 text-violet-300 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border border-violet-500/20 hover:border-violet-500/40 cursor-pointer disabled:opacity-50"
              >
                Re-Analyze Matrix
              </button>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="glassmorphic-card p-5 rounded-2xl flex flex-col justify-between bg-slate-950/20">
            <h4 className="font-mono text-[10px] text-slate-400 tracking-widest uppercase mb-3">
              Neural Calibrations
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1.5 border-b border-violet-500/5">
                <span className="text-xs text-slate-400 font-sans">Active priority queue density</span>
                <span className="font-mono text-xs text-slate-200">
                  {tasks.filter(t => t.priority === "URGENT_IMPORTANT" && !t.completed).length} heavy nodes
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-violet-500/5">
                <span className="text-xs text-slate-400 font-sans">Time commitment</span>
                <span className="font-mono text-xs text-slate-200">
                  ~{tasks.filter(t => !t.completed).reduce((acc, curr) => acc + (curr.estimatedMinutes || 20), 0)} min
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs text-slate-400 font-sans">Habit compliance index</span>
                <span className="font-mono text-xs text-slate-200">
                  {habits.length > 0 ? `${Math.round((habits.filter(h => h.streakCount > 0).length / habits.length) * 100)}%` : "0%"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
