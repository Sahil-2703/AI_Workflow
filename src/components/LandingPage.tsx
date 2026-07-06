import React from "react";
import { Sparkles, ArrowRight, Zap, Target, Shield, Heart, Activity, CheckCircle, Flame, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenPricing: () => void;
  key?: string;
}

export default function LandingPage({ onGetStarted, onOpenPricing }: LandingPageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: "Grok AI Workflow Engine",
      desc: "Tap into Grok's sharp, real-time context-aware intelligence tailored exactly to your active daily workspace.",
      color: "from-violet-500 to-indigo-500",
    },
    {
      icon: Shield,
      title: "Supabase Live Synchronization",
      desc: "Enjoy robust, persistent state saving and synchronization of your historical conversations and role preferences across devices.",
      color: "from-amber-500 to-orange-500",
    }
  ];

  return (
    <div className="min-h-screen bg-dark-void relative overflow-hidden" id="product-landing-page">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-widest uppercase mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span>Grok-Engine v2.5 Launch Block</span>
        </motion.div>

        {/* Display Typography Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-5xl md:text-7xl tracking-tight text-slate-100 max-w-4xl leading-[1.1] mb-6"
        >
          Calibrate Your Focus with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-300">
            Aetheris AI
          </span>
        </motion.h1>

        {/* Description Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-slate-400 font-sans max-w-2xl font-light leading-relaxed mb-10"
        >
          A state-of-the-art cognitive productivity console combining role-tailored **Grok AI prompt workflows** and **Supabase persistent conversation synchronization**.
        </motion.p>

        {/* CTA Button Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-500 text-slate-100 font-mono text-xs tracking-wider font-bold uppercase transition-all duration-300 hover:scale-[1.03] hover:shadow-lg glow-purple flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <span>Activate Console</span>
            <ArrowRight className="w-4 h-4 text-slate-100" />
          </button>
          
          <button
            onClick={onOpenPricing}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-950/60 border border-violet-500/20 hover:border-violet-500/40 text-violet-300 hover:text-slate-100 font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            Explore Pricing
          </button>
        </motion.div>
      </div>

      {/* Grid Features section in Glassmorphic Card layouts */}
      <div className="max-w-4xl mx-auto px-6 pb-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * idx + 0.3 }}
                className="glassmorphic p-6 rounded-2xl relative overflow-hidden group border border-violet-500/10 hover:border-violet-500/25 transition-all duration-300 hover:translate-y-[-4px]"
              >
                {/* Colored visual pulse accent corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feat.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`} />
                
                <div className="mb-4 inline-block p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-violet-400 group-hover:text-violet-300 group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-sm text-slate-200 tracking-wide mb-2 group-hover:text-slate-100 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed font-light">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Conversion CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-32 text-center relative z-10">
        <div className="glassmorphic-card p-10 md:p-14 rounded-3xl border border-violet-500/10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-pink-500/5" />
          <Activity className="w-10 h-10 text-cyan-400 animate-pulse mb-6 relative z-10" />
          <h2 className="font-display font-bold text-3xl tracking-tight text-slate-100 mb-4 relative z-10">
            Ready to Calibrate Your Daily Workflow?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-sans max-w-xl font-light leading-relaxed mb-8 relative z-10">
            Sign up now to choose your personalized role, synchronize metadata to Supabase, and access custom Grok prompt templates with persistent conversation histories.
          </p>
          <button
            onClick={onGetStarted}
            className="relative z-10 px-8 py-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-slate-100 font-mono text-xs tracking-wider uppercase font-bold hover:scale-105 transition-all duration-300 glow-purple flex items-center gap-2 cursor-pointer"
          >
            <span>Initialize Onboarding</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
