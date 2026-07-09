import React, { useState } from "react";
import { 
  Sparkles, 
  Video, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Terminal, 
  ArrowLeft, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
// @ts-ignore
import nexusCrystal from "../assets/images/nexus_crystal_1783611744284.jpg";

interface OnboardingPageProps {
  onSuccess: (role: string) => void;
  onBack?: () => void;
  key?: string;
}

export default function OnboardingPage({ onSuccess, onBack }: OnboardingPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const roles = [
    {
      id: "Creator",
      title: "Content Creator",
      desc: "Multi-modal AI generation & editing.",
      icon: Video,
    },
    {
      id: "Student",
      title: "Student",
      desc: "Research, synthesis & academic tools.",
      icon: GraduationCap,
    },
    {
      id: "Employee",
      title: "Employee",
      desc: "Workflow automation & task management.",
      icon: Briefcase,
    },
    {
      id: "Business",
      title: "Business",
      desc: "Strategic analysis & team orchestration.",
      icon: Building2,
    },
    {
      id: "Developer",
      title: "Developer",
      desc: "Agentic coding & system architecture.",
      icon: Terminal,
    },
  ];

  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev === 0 ? roles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
  };

  const handleSelection = () => {
    onSuccess(roles[activeIndex].id);
  };

  const currentRole = roles[activeIndex];
  const progressPercent = 75 + activeIndex * 5;

  return (
    <div 
      className="min-h-screen bg-[#07050d] text-slate-100 flex flex-col lg:flex-row relative overflow-hidden" 
      id="onboarding-panel"
    >
      {/* Questionnaire Left Section */}
      <div className="w-full lg:w-[58%] p-6 md:p-12 lg:p-20 flex flex-col justify-between min-h-screen relative z-10">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#5821e6] flex items-center justify-center shadow-[0_0_20px_rgba(88,33,230,0.4)] border border-violet-400/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-100 tracking-wide">
            Aetheris AI
          </span>
        </div>

        {/* Content Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="my-auto py-10 md:py-16"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-100 tracking-tight leading-tight mb-4">
            What best describes you?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl font-light leading-relaxed mb-10">
            We'll architect your workspace based on your professional DNA for maximum neural efficiency.
          </p>

          {/* Carousel Selector Area */}
          <div className="relative flex items-center justify-between max-w-xl mx-auto w-full py-8 px-4" id="role-carousel-container">
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-20 w-12 h-12 rounded-full bg-[#0d0918]/60 border border-[#1c1630] flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-[#110c22]/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 cursor-pointer"
              title="Previous Profile"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Active Card Container with responsive sizes */}
            <div className="w-full px-14">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                onClick={handleSelection}
                className="w-full bg-[#120d24] border border-violet-500/40 rounded-3xl p-8 shadow-[0_0_35px_rgba(124,58,237,0.12)] relative overflow-hidden flex flex-col items-center text-center group h-64 justify-between cursor-pointer hover:border-violet-400 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300"
              >
                {/* Tech background line inside card */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
                
                {/* Icon Block */}
                <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/40 text-violet-400 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.1)] group-hover:scale-105 transition-all duration-300 mt-2">
                  {React.createElement(currentRole.icon, { className: "w-7 h-7" })}
                </div>

                {/* Metadata */}
                <div className="mb-4">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-violet-400/80 uppercase block mb-1.5">
                    ROLE PROFILE {activeIndex + 1} OF {roles.length}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-slate-100 mb-2 tracking-wide">
                    {currentRole.title}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans font-light">
                    {currentRole.desc}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-20 w-12 h-12 rounded-full bg-[#0d0918]/60 border border-[#1c1630] flex items-center justify-center text-slate-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-[#110c22]/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 cursor-pointer"
              title="Next Profile"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#1b152d]/40">
          <button 
            onClick={onBack ? onBack : () => window.history.back()}
            className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-slate-500 hover:text-slate-300 transition-colors cursor-pointer w-32"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>

          {/* Indicators */}
          <div className="flex items-center space-x-2">
            {roles.map((role, idx) => (
              <button
                key={role.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? "right" : "left");
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? "w-6 bg-violet-500" : "w-1.5 bg-[#1c182d] hover:bg-slate-700"
                }`}
                title={`Go to ${role.title}`}
              />
            ))}
          </div>

          {/* Spacer to keep indicators centered */}
          <div className="w-32 hidden sm:block" />
        </div>
      </div>

      {/* Right visualization Section */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-center items-center bg-[#050308] border-l border-[#130f21] p-16 relative overflow-hidden">
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />
        
        {/* Background cosmic bloom */}
        <div className="absolute w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Neural Map Area */}
        <div className="relative flex items-center justify-center w-80 h-80">
          {/* Orbital circles */}
          <div className="absolute w-[340px] h-[340px] rounded-full border border-slate-900 flex items-center justify-center" />
          <div className="absolute w-80 h-80 rounded-full border border-violet-500/10 flex items-center justify-center" />
          <div className="absolute w-[240px] h-[240px] rounded-full border border-slate-900/60 flex items-center justify-center" />

          {/* Central heavy rounded square image */}
          <div className="relative w-56 h-56 rounded-[2.5rem] overflow-hidden border border-violet-500/20 shadow-2xl z-10 flex items-center justify-center bg-slate-950 p-2">
            <img 
              src={nexusCrystal} 
              alt="Nexus Core visualizer"
              className="w-full h-full object-cover rounded-[2.2rem]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floaters */}
          {/* Upper Right Badge */}
          <div className="absolute -top-4 -right-12 bg-[#0c0818]/90 border border-violet-500/20 rounded-md px-3 py-1 font-mono text-[8px] tracking-widest text-violet-300 shadow-2xl z-20 flex items-center space-x-1.5">
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />
            <span>NEURAL_MAPPING: ACTIVE</span>
          </div>

          {/* Lower Left Badge */}
          <div className="absolute -bottom-4 -left-12 bg-[#0c0818]/90 border border-violet-500/20 rounded-md px-3 py-1 font-mono text-[8px] tracking-widest text-violet-300 shadow-2xl z-20 flex items-center space-x-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span>PERSONALIZATION_SYNC: {progressPercent}%</span>
          </div>
        </div>

        {/* Description Text */}
        <div className="text-center mt-12 max-w-sm relative z-10">
          <h3 className="font-display font-bold text-xl text-slate-100 mb-2 tracking-wide">
            Getting Everything Ready
          </h3>
          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xs mx-auto">
            Selecting the right AI workflow and preparing the workspace for your request.
          </p>
        </div>
      </div>
    </div>
  );
}
