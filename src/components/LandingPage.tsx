import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Shield, 
  Cpu, 
  Code, 
  FileText, 
  BarChart2, 
  ChevronRight, 
  MessageSquare, 
  Activity, 
  Network, 
  Globe, 
  Layers,
  ArrowUpRight,
  Zap,
  Lock,
  Compass
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenPricing: () => void;
  key?: string;
}

export default function LandingPage({ onGetStarted, onOpenPricing }: LandingPageProps) {
  // Navigation scrolling helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden" id="product-landing-page">
      {/* Immersive Cybernetic Space Gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tag/Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-mono tracking-widest uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            <span>Next Generation Connectome</span>
          </motion.div>

          {/* Large Bold Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-5xl md:text-6xl tracking-tight text-slate-100 leading-[1.05] mb-2"
          >
            Build AI Workflows
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display font-black text-4xl md:text-5xl tracking-tight text-violet-400 leading-[1.1] mb-6"
          >
            Faster Than Ever
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 font-sans max-w-xl font-light leading-relaxed mb-10"
          >
            Transform ideas into intelligent workflows with AI that understands documents, code, research, and communication.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-slate-100 font-mono text-xs tracking-wider font-extrabold uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-violet-500/20 glow-purple flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Launch Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => scrollToSection("core-capacities-section")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-300 hover:text-slate-100 font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer backdrop-blur-md"
            >
              View Protocol
            </button>
          </motion.div>
        </div>

        {/* Right Hero Graphic: Futuristic Holographic 3D Connectome Sphere */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center"
          >
            {/* Ambient Background Glow Layer */}
            <div className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full bg-violet-500/5 blur-[50px] animate-pulse pointer-events-none" />

            {/* Glowing Interactive SVG Connectome Globe */}
            <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 overflow-visible">
              <defs>
                <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                  <stop offset="45%" stopColor="#ec4899" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Central Core Sphere */}
              <circle cx="200" cy="200" r="95" fill="url(#sphereGlow)" />

              {/* Animated Inner Connectome Matrix Nodes */}
              <g className="animate-[pulse_4s_ease-in-out_infinite]">
                <line x1="150" y1="160" x2="250" y2="240" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.25" />
                <line x1="250" y1="160" x2="150" y2="240" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.25" />
                <line x1="200" y1="120" x2="200" y2="280" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.15" />
                <line x1="120" y1="200" x2="280" y2="200" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.15" />
                
                {/* Central Brain/Atom glowing nested clusters */}
                <circle cx="200" cy="200" r="40" fill="none" stroke="url(#neonPurple)" strokeWidth="0.75" strokeDasharray="3, 3" className="animate-[spin_20s_linear_infinite]" />
                <circle cx="200" cy="200" r="50" fill="none" stroke="url(#neonCyan)" strokeWidth="0.75" strokeDasharray="6, 4" className="animate-[spin_12s_linear_infinite_reverse]" />
                <circle cx="200" cy="200" r="70" fill="none" stroke="#e0e7ff" strokeWidth="0.5" strokeOpacity="0.1" />

                {/* Cyber Connector Pins */}
                <circle cx="150" cy="160" r="3" fill="#a78bfa" className="animate-ping" style={{ animationDuration: "3s" }} />
                <circle cx="250" cy="240" r="3" fill="#ec4899" />
                <circle cx="250" cy="160" r="2.5" fill="#06b6d4" />
                <circle cx="150" cy="240" r="3.5" fill="#818cf8" />
                <circle cx="200" cy="120" r="2" fill="#e0e7ff" />
                <circle cx="200" cy="280" r="3" fill="#ec4899" className="animate-ping" style={{ animationDuration: "2.5s" }} />
              </g>

              {/* Concentric Orbital Rings */}
              <g className="animate-[spin_40s_linear_infinite]">
                <ellipse cx="200" cy="200" rx="130" ry="55" fill="none" stroke="url(#neonPurple)" strokeWidth="1.25" strokeOpacity="0.6" strokeDasharray="100, 20" />
                <ellipse cx="200" cy="200" rx="145" ry="65" fill="none" stroke="url(#neonCyan)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="50, 45" />
              </g>
              <g className="animate-[spin_25s_linear_infinite_reverse]">
                <ellipse cx="200" cy="200" rx="135" ry="45" fill="none" stroke="#ec4899" strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="80, 10" />
                <ellipse cx="200" cy="200" rx="155" ry="75" fill="none" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="120, 30" />
              </g>

              {/* Floating micro-particles */}
              <circle cx="80" cy="140" r="1.5" fill="#06b6d4" opacity="0.6" className="animate-pulse" />
              <circle cx="320" cy="260" r="2" fill="#a78bfa" opacity="0.8" />
              <circle cx="110" cy="290" r="1" fill="#ec4899" opacity="0.5" />
              <circle cx="290" cy="90" r="2.5" fill="#ffffff" opacity="0.4" className="animate-ping" style={{ animationDuration: "4s" }} />
            </svg>

            {/* Float Badge 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-[-20px] md:right-[-40px] z-20 bg-slate-900/90 border border-violet-500/20 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex flex-col items-start min-w-[140px]"
            >
              <span className="text-sm font-black tracking-tight text-violet-300">500K+</span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold">Active Architects</span>
            </motion.div>

            {/* Float Badge 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-6 left-[-20px] md:left-[-40px] z-20 bg-slate-900/90 border border-violet-500/20 rounded-xl px-4 py-2.5 shadow-2xl backdrop-blur-md flex flex-col items-start min-w-[140px]"
            >
              <span className="text-sm font-black tracking-tight text-cyan-300">50M+</span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold">Tokens Processed</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* --- SECTION 1: CORE CAPACITIES --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900" id="core-capacities-section">
        <div className="text-left mb-14">
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-slate-100 mb-3">
            Core Capacities
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-sans font-light tracking-wide">
            Modular intelligence for every vertical of your enterprise.
          </p>
        </div>

        {/* 5 columns in a single horizontal row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Capacity 1 */}
          <div className="bg-slate-950/40 border border-slate-900 hover:border-violet-500/15 p-5 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-slate-900/20 group">
            <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono tracking-wider text-slate-200 uppercase font-extrabold mb-2.5">
              Neural Writing
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Advanced linguistic modeling for precision content architecture.
            </p>
          </div>

          {/* Capacity 2 */}
          <div className="bg-slate-950/40 border border-slate-900 hover:border-violet-500/15 p-5 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-slate-900/20 group">
            <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <Code className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono tracking-wider text-slate-200 uppercase font-extrabold mb-2.5">
              Ghost Code
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Self-healing syntax and autonomous system generation.
            </p>
          </div>

          {/* Capacity 3 */}
          <div className="bg-slate-950/40 border border-slate-900 hover:border-violet-500/15 p-5 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-slate-900/20 group">
            <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono tracking-wider text-slate-200 uppercase font-extrabold mb-2.5">
              Adaptive Learning
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Continuous model refinement through iterative simulation.
            </p>
          </div>

          {/* Capacity 4 */}
          <div className="bg-slate-950/40 border border-slate-900 hover:border-violet-500/15 p-5 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-slate-900/20 group">
            <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono tracking-wider text-slate-200 uppercase font-extrabold mb-2.5">
              Synaptic Data
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Visualizing multidimensional datasets with high fidelity.
            </p>
          </div>

          {/* Capacity 5 */}
          <div className="bg-slate-950/40 border border-slate-900 hover:border-violet-500/15 p-5 rounded-xl transition-all duration-300 flex flex-col items-start hover:bg-slate-900/20 group">
            <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-mono tracking-wider text-slate-200 uppercase font-extrabold mb-2.5">
              Protocol S
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Encrypted cognitive layers protected by quantum barriers.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: ARCHITECTURAL FLOW --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900" id="architectural-flow-section">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-slate-100 mb-3">
            Architectural Flow
          </h2>
          <p className="text-xs text-slate-400 font-sans font-light tracking-wide max-w-lg mx-auto leading-relaxed">
            From ideation to execution in five cohesive steps.
          </p>
        </div>

        {/* Steps diagram connected by horizontal line on desktop */}
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-slate-900/60 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-black tracking-widest text-violet-400 shadow-xl mb-6 hover:border-violet-500/30 hover:scale-105 transition-all duration-300">
                01
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Ask
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                Input your questions, documents, or data to define your task.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-black tracking-widest text-violet-400 shadow-xl mb-6 hover:border-violet-500/30 hover:scale-105 transition-all duration-300">
                02
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Understand
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                The AI analyzes context, extracts code, and processes files instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-black tracking-widest text-violet-400 shadow-xl mb-6 hover:border-violet-500/30 hover:scale-105 transition-all duration-300">
                03
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Organize
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                Structure and filter your assets into highly structured schemas.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-black tracking-widest text-violet-400 shadow-xl mb-6 hover:border-violet-500/30 hover:scale-105 transition-all duration-300">
                04
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Build
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                Design tailored workflows with custom parameters and logic rules.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs font-black tracking-widest text-violet-400 shadow-xl mb-6 hover:border-violet-500/30 hover:scale-105 transition-all duration-300">
                05
              </div>
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                Generate
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                Execute optimized pipelines to deliver accurate answers, code, or documents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: EXTRA CAPABILITIES GRID (BENTO BOX STYLE) --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900" id="bento-grid-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Omniscient Chat (Takes 8 cols) */}
          <div className="lg:col-span-8 bg-slate-950/40 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/15 transition-all duration-300">
            <div>
              <h3 className="font-display font-black text-xl md:text-2xl text-slate-100 tracking-wide mb-3">
                Intelligent AI Workspace
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light max-w-xl mb-8">
                Create, analyze, research, and automate everyday work with AI that keeps every conversation, document, and idea organized in one place.
              </p>
            </div>
            
            {/* Minimal Dialogue Mockup representation inside card */}
            <div className="bg-slate-950/80 border border-slate-900/60 rounded-xl p-4 font-mono text-[10px] space-y-3.5 shadow-2xl relative z-10">
              <div className="flex items-start space-x-2.5">
                <span className="text-violet-400 font-extrabold uppercase text-[9px] shrink-0">Prompt</span>
                <span className="text-slate-300">
                  Generate a professional email replying to a client's pricing inquiry and attach a concise proposal summary.
                </span>
              </div>
              <div className="w-full h-px bg-slate-900/60" />
              <div className="flex items-start space-x-2.5">
                <span className="text-emerald-400 font-extrabold uppercase text-[9px] shrink-0">AI Workspace</span>
                <span className="text-slate-400 leading-relaxed block whitespace-pre-line">
                  ✓ Intent understood{"\n"}
                  ✓ Professional email drafted{"\n"}
                  ✓ Proposal summarized{"\n"}
                  ✓ Conversation saved for future reference
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Workflow Builder (Takes 4 cols) */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between group hover:border-violet-500/15 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-4 h-4 animate-pulse" />
              </div>
              <h3 className="font-display font-black text-lg text-slate-100 tracking-wide mb-2">
                Smart AI Workflows
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">
                Switch between specialized AI workflows for emails, PDFs, coding, resumes, research, and more—all from one intelligent workspace.
              </p>
            </div>

            {/* Minimal Visual Logic representation inside card */}
            <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-xl flex items-center justify-between font-mono text-[8px] text-slate-500">
              <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">Source</div>
              <ChevronRight className="w-3 h-3 text-violet-500" />
              <div className="px-2 py-1 bg-violet-950/40 border border-violet-500/20 rounded text-violet-300 font-bold">AI Engine</div>
              <ChevronRight className="w-3 h-3 text-violet-500" />
              <div className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">Result</div>
            </div>
          </div>

          {/* Row below: Card 3, Card 4, Card 5 (each takes 4 cols) */}
          {/* Card 3: Zero Latency */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between group hover:border-violet-500/15 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-display font-black text-lg text-slate-100 tracking-wide mb-2">
                Real-Time AI Responses
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">
                Experience fast, streaming AI that writes, analyzes, researches, and creates in real time.
              </p>
            </div>

            {/* Live Indicator block */}
            <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-900/80 px-3.5 py-2.5 rounded-xl font-mono text-[9px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 font-bold uppercase tracking-wider">AI ENGINE ONLINE</span>
            </div>
          </div>

          {/* Card 4: Model Marketplace */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between group hover:border-violet-500/15 transition-all duration-300">
            <div>
              <div className="w-9 h-9 rounded-lg bg-violet-600/10 border border-violet-500/15 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-display font-black text-lg text-slate-100 tracking-wide mb-2">
                AI Workspaces
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">
                Access specialized AI experiences built for everyday productivity—from writing and coding to research and document analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-[8px] font-mono uppercase font-black tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">Email Writer</span>
              <span className="text-[8px] font-mono uppercase font-black tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">PDF Analyzer</span>
              <span className="text-[8px] font-mono uppercase font-black tracking-wider text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded">Code Assistant</span>
            </div>
          </div>

          {/* Card 5: Dark display card with 4 sleek vertical placeholders */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-8 flex flex-col justify-between hover:border-violet-500/15 transition-all duration-300">
            <div className="space-y-3.5 w-full">
              <div className="h-4 w-full bg-slate-900/60 rounded border border-slate-900 flex items-center px-2">
                <div className="h-1 bg-violet-500 rounded animate-[pulse_2s_infinite]" style={{ width: "70%" }} />
              </div>
              <div className="h-4 w-full bg-slate-900/60 rounded border border-slate-900 flex items-center px-2">
                <div className="h-1 bg-violet-500 rounded animate-[pulse_2.5s_infinite]" style={{ width: "45%" }} />
              </div>
              <div className="h-4 w-full bg-slate-900/60 rounded border border-slate-900 flex items-center px-2">
                <div className="h-1 bg-violet-500 rounded animate-[pulse_3s_infinite]" style={{ width: "90%" }} />
              </div>
              <div className="h-4 w-full bg-slate-900/60 rounded border border-slate-900 flex items-center px-2">
                <div className="h-1 bg-violet-500 rounded animate-[pulse_2.2s_infinite]" style={{ width: "60%" }} />
              </div>
            </div>
            <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase mt-4">
              TELEMETRY LOGS
            </p>
          </div>
        </div>
      </div>


      {/* --- SECTION 5: CALL TO ACTION (CTA) --- */}
      <div className="max-w-5xl mx-auto px-6 py-20 relative z-10 text-center" id="ready-cta-section">
        <div className="bg-slate-950/60 border border-slate-900 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-cyan-500/5 pointer-events-none" />
          
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-tight text-slate-100 mb-4 relative z-10 leading-tight">
            Ready to Architect<br />the Future?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-sans max-w-xl font-light leading-relaxed mb-8 relative z-10">
            Join 500,000+ architects building the next generation of intelligent systems. Secure your seat in the nexus today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center relative z-10">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-slate-100 font-mono text-xs tracking-wider uppercase font-extrabold transition-all duration-300 hover:scale-105 glow-purple flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert("Connecting with architecture desk...")}
              className="px-8 py-3.5 rounded-full bg-slate-950/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 text-slate-300 hover:text-slate-100 font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* --- FOOTER AS STYLED IN IMAGE --- */}
      <footer className="bg-slate-950/80 border-t border-slate-900 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Block */}
          <div className="md:col-span-6 flex flex-col items-start text-left space-y-4">
            <span className="font-display font-black tracking-wider text-base text-slate-100 uppercase">
              Aetheris AI
            </span>
            <p className="text-xs text-slate-500 leading-relaxed font-light max-w-sm">
              Building the foundational structures of the digital cognitive era. Performance, security, and elegance at scale.
            </p>
            <p className="text-[10px] font-mono text-slate-600 pt-4">
              © 2026 Aetheris Systems. Architectural Integrity Guaranteed.
            </p>
          </div>

          {/* Right Columns */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 text-left">
            {/* Column 1 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-400">Ecosystem</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-light">
                <li><button onClick={() => scrollToSection("core-capacities-section")} className="hover:text-slate-300 transition-colors">Architecture</button></li>
                <li><button onClick={() => scrollToSection("architectural-flow-section")} className="hover:text-slate-300 transition-colors">Protocol</button></li>
                <li><button onClick={onGetStarted} className="hover:text-slate-300 transition-colors">Terminal</button></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-400">Governance</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-light">
                <li><a href="#legal" className="hover:text-slate-300 transition-colors">Legal</a></li>
                <li><a href="#intelligence" className="hover:text-slate-300 transition-colors">Intelligence</a></li>
                <li><a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-400">Support</h4>
              <ul className="space-y-2.5 text-xs text-slate-500 font-light">
                <li><button onClick={onOpenPricing} className="hover:text-slate-300 transition-colors">Documentation</button></li>
                <li><a href="#community" className="hover:text-slate-300 transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
