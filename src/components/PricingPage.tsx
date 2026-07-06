import React from "react";
import { Check, Sparkles, X, Activity, HelpCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface PricingPageProps {
  currentTier: string;
  onUpgrade: (tier: string) => void;
  onClose: () => void;
}

export default function PricingPage({ currentTier, onUpgrade, onClose }: PricingPageProps) {
  const plans = [
    {
      id: "free",
      name: "Free Version",
      price: "$0",
      period: "forever",
      desc: "Perfect for testing automated templates and getting familiar with Grok AI workflows.",
      features: [
        "5 Free Grok AI workflow tokens",
        "Standard templates for chosen role",
        "Local Task Prioritization list",
        "Local Habit tracking indicators",
      ],
      notIncluded: [
        "Cloud-sync to Supabase database",
        "Automated Cognitive load load-balance advice",
        "Full Grok-2 Real-Time search capabilities",
        "Unlimited custom prompt switching",
      ],
      color: "border-slate-700/30",
      buttonText: "Current Plan",
    },
    {
      id: "lite",
      name: "Lite Subscription",
      price: "$9",
      period: "per month",
      desc: "Essential features for busy professionals, scholars, and builders striving for structure.",
      features: [
        "100 Grok-Beta workflow tokens/mo",
        "Full access to chosen role templates",
        "Advanced Eisenhower Matrix dashboard",
        "Habit contribution calendars",
        "Subtask auto-decomposition generator",
      ],
      notIncluded: [
        "Cloud-sync to Supabase database",
        "Unlimited Grok-2 Real-Time tokens",
      ],
      color: "border-cyan-500/20 shadow-cyan-500/5",
      buttonText: "Upgrade to Lite",
    },
    {
      id: "premium",
      name: "Premium Subscription",
      price: "$29",
      period: "per month",
      desc: "The ultimate cognitive stack with unlimited Grok AI power and live cloud persistence.",
      features: [
        "Unlimited Grok-2 Real-Time tokens",
        "Full access to ALL persona templates",
        "Live Cloud Synchronization to Supabase",
        "AI Prioritization Load-balance engine",
        "Premium support & early beta access",
      ],
      notIncluded: [],
      color: "border-pink-500/30 shadow-pink-500/10",
      buttonText: "Upgrade to Premium",
      popular: true,
    },
  ];

  const handlePurchase = (planId: string) => {
    if (planId === currentTier) return;
    onUpgrade(planId);
    alert(`Congratulations! You have successfully upgraded to the ${plans.find(p => p.id === planId)?.name}. All plan limits have been instantly updated.`);
  };

  return (
    <div className="min-h-screen bg-dark-void/95 flex flex-col justify-center py-16 px-6 relative z-50 overflow-y-auto" id="pricing-matrix">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Close button top right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-slate-950/50 border border-violet-500/15 hover:border-violet-500/30 text-slate-400 hover:text-slate-200 transition-all cursor-pointer font-mono text-xs uppercase"
        >
          Close [ESC]
        </button>
      </div>

      <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Frictionless Access Channels</span>
        </div>
        <h2 className="font-display font-bold text-3.5xl md:text-5xl text-slate-100 tracking-tight leading-none">
          Calibrate Your Billing Node
        </h2>
        <p className="mt-2.5 text-xs md:text-sm text-slate-400 font-sans max-w-xl mx-auto leading-relaxed font-light">
          Choose a tier corresponding to your cognitive demands. Unlimit your Grok workflows and activate Supabase live cloud-sync.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 w-full">
        {plans.map((plan) => {
          const isCurrent = currentTier === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`glassmorphic-card p-8 rounded-3xl border flex flex-col justify-between relative hover:translate-y-[-4px] ${plan.color} ${
                plan.popular ? "bg-[#15102a]/80" : "bg-[#0d0a18]/70"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-violet-500 text-slate-950 font-mono text-[9px] font-black tracking-widest px-3.5 py-1 rounded-full uppercase glow-pink">
                  Most Demanded
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-100 uppercase tracking-wide">
                    {plan.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-sans font-light h-12 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="flex items-baseline space-x-1.5 py-4 border-y border-violet-500/5">
                  <span className="text-5xl font-mono font-bold text-slate-100">
                    {plan.price}
                  </span>
                  <span className="text-xs font-sans text-slate-500 uppercase tracking-wide">
                    / {plan.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3.5">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">
                    Unlocked Telemetry
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start space-x-2.5 text-xs font-sans text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded?.map((feat) => (
                      <li key={feat} className="flex items-start space-x-2.5 text-xs font-sans text-slate-500 line-through">
                        <X className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase button */}
              <div className="pt-8 mt-6 border-t border-violet-500/5">
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer ${
                    isCurrent
                      ? "bg-slate-900 border border-violet-500/10 text-violet-400 cursor-default"
                      : plan.popular
                      ? "bg-gradient-to-r from-pink-500 to-violet-600 text-slate-100 hover:scale-[1.02] glow-pink"
                      : "bg-slate-950/60 border border-violet-500/20 hover:border-violet-500/40 text-violet-300 hover:text-slate-100"
                  }`}
                >
                  <span>{isCurrent ? "Active Node" : plan.buttonText}</span>
                  {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
