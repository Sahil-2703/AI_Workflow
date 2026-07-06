import React, { useState } from "react";
import { Sparkles, Video, GraduationCap, Briefcase, BarChart3, Code, ArrowRight, UserCheck } from "lucide-react";
import { motion } from "motion/react";

interface OnboardingPageProps {
  onSuccess: (role: string) => void;
  key?: string;
}

export default function OnboardingPage({ onSuccess }: OnboardingPageProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "Student",
      title: "Student",
      desc: "Study notes, summaries, assignments",
      icon: GraduationCap,
      color: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5",
      badge: "SCHOLAR",
    },
    {
      id: "Employee",
      title: "Employee",
      desc: "Emails, meetings, escalations",
      icon: Briefcase,
      color: "border-violet-500/20 text-violet-400 bg-violet-500/5",
      badge: "OFFICER",
    },
    {
      id: "Creator",
      title: "Creator",
      desc: "Scripts, captions, content ideas",
      icon: Video,
      color: "border-pink-500/20 text-pink-400 bg-pink-500/5",
      badge: "CREATOR",
    },
    {
      id: "Developer",
      title: "Developer",
      desc: "Code explanation, debugging, SQL",
      icon: Code,
      color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
      badge: "ENGINEER",
    },
    {
      id: "Business",
      title: "Business",
      desc: "Clients, proposals, support",
      icon: BarChart3,
      color: "border-amber-500/20 text-amber-400 bg-amber-500/5",
      badge: "VENTURE",
    },
  ];

  const handleSelection = () => {
    if (!selectedRole) return;
    onSuccess(selectedRole);
  };

  return (
    <div className="min-h-screen bg-dark-void flex flex-col justify-center items-center py-12 px-6 relative overflow-hidden" id="onboarding-panel">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[130px] pointer-events-none transform -translate-x-1/2" />

      <div className="max-w-xl text-center mb-10 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
          <span>Role Alignment Terminal</span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-100 tracking-tight">
          Select Your Active Persona
        </h2>
        <p className="mt-2 text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
          Grok AI automatically tailors workflow templates, priorities, and intelligence suggestions according to your selected persona below.
        </p>
      </div>

      <div className="w-full max-w-2xl relative z-10 space-y-4">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between relative group ${
                isSelected
                  ? "bg-violet-600/10 border-violet-500/40 glow-purple shadow-xl"
                  : "bg-[#0d0a18]/60 hover:bg-[#130f24]/70 border-violet-500/5 hover:border-violet-500/15"
              }`}
            >
              <div className="flex items-center space-x-4 min-w-0">
                <div className={`p-3 rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${role.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-display font-bold text-sm text-slate-200">
                      {role.title}
                    </span>
                    <span className="font-mono text-[8px] tracking-widest bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-violet-500/5">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans font-light truncate max-w-md sm:max-w-lg">
                    {role.desc}
                  </p>
                </div>
              </div>

              {/* Glowing Indicator checkmark */}
              <div
                className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "border-violet-400 bg-violet-600/25"
                    : "border-slate-700 bg-slate-950"
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />}
              </div>
            </button>
          );
        })}

        {/* Submit */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleSelection}
            disabled={!selectedRole}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-slate-100 font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-center space-x-2.5 transition-all duration-300 disabled:opacity-40 hover:scale-[1.03] glow-purple disabled:scale-100 cursor-pointer"
          >
            <span>Activate Persona</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
