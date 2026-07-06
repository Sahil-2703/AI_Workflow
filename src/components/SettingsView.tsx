import React, { useState, useEffect } from "react";
import { 
  Sliders, 
  Database, 
  Key, 
  Info, 
  Check, 
  HelpCircle,
  TrendingUp,
  Cpu,
  RefreshCw,
  Award
} from "lucide-react";
import { SupabaseConfig } from "../types";

interface SettingsViewProps {
  tasks: any[];
  habits: any[];
  onSeedData: () => void;
  onClearAllData: () => void;
}

export default function SettingsView({ tasks, habits, onSeedData, onClearAllData }: SettingsViewProps) {
  // DB Config State
  const [dbConfig, setDbConfig] = useState<SupabaseConfig>({
    url: "",
    anonKey: "",
    isConfigured: false,
    useFallback: true
  });
  const [isCheckingConfig, setIsCheckingConfig] = useState(false);

  const checkSupabaseConfig = async () => {
    setIsCheckingConfig(true);
    try {
      const response = await fetch("/api/config/supabase");
      const data = await response.json();
      setDbConfig({
        url: data.url,
        anonKey: data.anonKey,
        isConfigured: data.isConfigured,
        useFallback: !data.isConfigured
      });
    } catch (err) {
      console.error("Failed to query Supabase configurations:", err);
    } finally {
      setIsCheckingConfig(false);
    }
  };

  useEffect(() => {
    checkSupabaseConfig();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in" id="settings-view">
      
      {/* Header Bar */}
      <div>
        <h2 className="font-display font-semibold text-3xl text-slate-100 flex items-center gap-3">
          Devices & API Calibrations <span className="text-violet-400 font-mono text-sm tracking-widest font-normal bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">SYSTEM CONFIG</span>
        </h2>
        <p className="text-sm text-slate-400 font-sans mt-0.5">
          Administer your third-party keys, persistent Supabase nodes, and clean simulated databases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: DB & API configuration status (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Supabase connection profile card */}
          <div className="glassmorphic-card p-6 rounded-2xl relative overflow-hidden" id="supabase-profile-settings">
            <div className="flex items-center space-x-3 pb-4 border-b border-violet-500/10 mb-5">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display font-semibold text-sm text-slate-200 tracking-wider">
                SUPABASE DATA SOURCE NODE
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Aetheris Productivity Core runs natively on our server-side SQLite/in-memory engine by default. To hook up your personal persistent Supabase cloud database, configure these secrets in your <strong className="text-violet-400">Settings &gt; Secrets</strong> panel.
              </p>

              {/* Status Indicator Bar */}
              <div className="flex items-center justify-between p-4 bg-slate-950/80 rounded-xl border border-violet-500/10">
                <div className="flex items-center space-x-3">
                  <span className={`w-3 h-3 rounded-full ${dbConfig.isConfigured ? "bg-emerald-400 animate-pulse" : "bg-cyan-400"}`} />
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block">Active Node State</span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {dbConfig.isConfigured ? "SECURELY SYNCED TO SUPABASE" : "RUNNING IN MEMORY (SQLITE FALLBACK)"}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={checkSupabaseConfig}
                  disabled={isCheckingConfig}
                  className="p-2 bg-slate-900 border border-violet-500/10 rounded-lg hover:border-violet-500/25 text-slate-400"
                  title="Refresh keys status"
                >
                  <RefreshCw className={`w-4 h-4 ${isCheckingConfig ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Environment Variable Read-only metrics */}
              <div className="space-y-3 pt-1">
                <div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                    SUPABASE_URL
                  </span>
                  <input
                    type="text"
                    readOnly
                    value={dbConfig.url || "http://not_provided_using_local_memory_fallback.local"}
                    className="w-full bg-slate-950/40 border border-violet-500/5 px-3.5 py-2.5 rounded-lg text-xs font-mono text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                    SUPABASE_ANON_KEY
                  </span>
                  <input
                    type="password"
                    readOnly
                    value={dbConfig.isConfigured ? "••••••••••••••••••••••••••••••••••••" : "Not configured. Local fallback enabled."}
                    className="w-full bg-slate-950/40 border border-violet-500/5 px-3.5 py-2.5 rounded-lg text-xs font-mono text-slate-400 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table schema instruction guide card */}
          <div className="glassmorphic-card p-6 rounded-2xl">
            <div className="flex items-center space-x-3 pb-3 border-b border-violet-500/10 mb-4">
              <Info className="w-4 h-4 text-violet-400" />
              <h3 className="font-display font-semibold text-sm text-slate-200 tracking-wider">
                SUPABASE SQL SCHEMA LAYOUT
              </h3>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-slate-400 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-violet-500/5">
              <p className="text-violet-300 font-bold">-- Create tasks Table Schema:</p>
              <pre className="overflow-x-auto select-all">
{`CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  cognitive_load INTEGER DEFAULT 3,
  category TEXT DEFAULT 'Work',
  estimated_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);`}
              </pre>
            </div>
          </div>

        </div>

        {/* Right Side: Database Management Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Seeds and state flush panel */}
          <div className="glassmorphic-card p-5 rounded-2xl bg-slate-950/20" id="data-management-actions">
            <h4 className="font-mono text-[10px] text-slate-400 tracking-widest uppercase mb-4">
              Local System Operations
            </h4>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-300 block mb-2 font-sans">
                  Seed the system with pre-calibrated sample tasks and streak histories to test cognitive prioritizing and visual contribution grids.
                </span>
                <button
                  onClick={onSeedData}
                  className="w-full py-2.5 bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/20 text-violet-300 font-mono text-xs rounded-xl tracking-wide transition-all"
                >
                  LOAD INITIAL SAMPLE SEEDS
                </button>
              </div>

              <div className="pt-4 border-t border-violet-500/5">
                <span className="text-xs text-slate-300 block mb-2 font-sans">
                  Flush all active nodes, habit compliance trackers, and checklists from local state and server-side memory buffers.
                </span>
                <button
                  onClick={onClearAllData}
                  className="w-full py-2.5 bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/15 text-rose-300 font-mono text-xs rounded-xl tracking-wide transition-all"
                >
                  FLUSH SYSTEM MEMORY
                </button>
              </div>
            </div>
          </div>

          {/* Quick diagnostics profile */}
          <div className="border border-violet-500/5 p-4 rounded-2xl bg-slate-950/40 space-y-3 font-mono text-[10px] text-slate-500">
            <h5 className="text-slate-400 font-bold">CALIBRATION AUDIT REPORT</h5>
            <div className="flex justify-between">
              <span>ACTIVE CHECKS</span>
              <span className="text-slate-300">{tasks.length} nodes</span>
            </div>
            <div className="flex justify-between">
              <span>LOGGED HABITS</span>
              <span className="text-slate-300">{habits.length} routines</span>
            </div>
            <div className="flex justify-between">
              <span>STABILITY CLASSIFICATION</span>
              <span className="text-emerald-400">OPTIMAL RANGE</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
