import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  Sparkles, 
  User, 
  LogOut, 
  Zap, 
  Send, 
  Cpu, 
  ChevronDown, 
  MessageSquare, 
  Settings, 
  Trash2, 
  Database,
  X,
  PlusCircle,
  Play,
  Pause,
  Square
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import OnboardingPage from "./components/OnboardingPage";
import PricingPage from "./components/PricingPage";

// Types and helper client
import { isSupabaseConfigured, getLocalStore, saveLocalStore } from "./lib/supabaseClient";

interface ChatConvo {
  id: string;
  title: string;
  role: string;
  promptType: string;
  history: { role: "user" | "model"; content: string; timestamp: string }[];
  createdAt: string;
}

export default function App() {
  // Navigation Routing States
  // views: "landing" | "auth" | "onboarding" | "dashboard" | "pricing"
  const [currentView, setCurrentView] = useState<"landing" | "auth" | "onboarding" | "dashboard" | "pricing">("landing");
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Authenticated User States
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    role: string;
    tier: string;
    tokensUsed: number;
  } | null>(null);

  // Conversation Sidebar Drawer States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<ChatConvo[]>([]);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);

  // Workspace AI Prompt Inputs
  const [selectedPromptType, setSelectedPromptType] = useState<string>("");
  const [promptInput, setPromptInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState<string>("");
  const [engineUsed, setEngineUsed] = useState<string>("Grok-2 (Real-Time)");

  // Profile dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Scroll anchor reference
  const outputEndRef = useRef<HTMLDivElement>(null);

  // Pause and Abort stream control state & references
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const isAbortedRef = useRef(false);

  const handleTogglePause = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    isPausedRef.current = nextPaused;
  };

  const handleResetStream = () => {
    if (isGenerating) {
      isAbortedRef.current = true;
      setIsPaused(false);
      isPausedRef.current = false;
      setStreamedText("");
      setIsGenerating(false);
    } else if (activeConvoId) {
      setConversations(prev => {
        const next = prev.map(c => c.id === activeConvoId ? { ...c, history: [] } : c);
        saveLocalStore("aetheris_convos", next);
        return next;
      });
      setStreamedText("");
    }
  };

  // Check for authenticated user on initial load
  useEffect(() => {
    const cachedUser = localStorage.getItem("aetheris_user");
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      setUser(parsedUser);
      setCurrentView("dashboard");
    }

    // Initial default mock conversation histories
    const defaultConvos: ChatConvo[] = [
      {
        id: "convo-1",
        title: "YouTube: Future of Grok AI",
        role: "Creator",
        promptType: "📹 Video Script Draft",
        history: [
          { role: "user", content: "Draft an engaging intro script explaining xAI Grok's features.", timestamp: new Date().toISOString() },
          { 
            role: "model", 
            content: `### YouTube Intro Script: Grok AI Revolution\n\n**[Visual: Dynamic neon background with xAI logo pulsing]**\n\n**Voiceover (Fast-paced, high energy):**\n"In a world where standard LLMs have become predictable, safe, and slightly sanitised, one AI engine dares to operate with a different kind of neural network. A network that values logic, real-time ground truth, and a bit of witty pragmatism. Yes, we are talking about Grok AI."\n\n**[Visual: Graphic overlay showing neural nodes firing]**\n\n"Today, we are deconstructing the brand-new Grok v2.5 matrix. No generic summaries, just high-throughput results. Let's calibrate."`, 
            timestamp: new Date().toISOString() 
          }
        ],
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: "convo-2",
        title: "Study Sheet: Quantum Tunneling",
        role: "Student",
        promptType: "📚 Custom Study Notes",
        history: [
          { role: "user", content: "Summarize the primary mechanism of quantum tunneling.", timestamp: new Date().toISOString() },
          { 
            role: "model", 
            content: `### Quantum Tunneling Study Guide\n\n**1. Wave-Particle Duality Concept**\nIn classical physics, a particle cannot cross a barrier if its kinetic energy is less than the potential energy barrier. However, in quantum physics, particles behave as wavefunctions. \n\n**2. The Mechanism**\nWhen a wave encounters a finite potential barrier, the wave amplitude does not immediately drop to zero. Instead, it decays exponentially inside the barrier. If the barrier is thin enough, the wavefunction emerges on the other side with non-zero probability amplitude. \n\n**3. Actionable Formula Key**\n- Transmission coefficient $T \\approx e^{-2\\gamma L}$\n- $L$ representing the barrier length.\n- $\\gamma$ representing the exponential decay rate inside the barrier.`, 
            timestamp: new Date().toISOString() 
          }
        ],
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];

    const cachedConvos = getLocalStore("aetheris_convos", defaultConvos);
    setConversations(cachedConvos);
    if (cachedConvos.length > 0) {
      setActiveConvoId(cachedConvos[0].id);
    }
  }, []);

  // Update prompt option list automatically when user's active role changes
  useEffect(() => {
    if (user?.role) {
      const prompts = getPromptsForRole(user.role);
      if (prompts.length > 0) {
        setSelectedPromptType(prompts[0]);
      }
    }
  }, [user?.role]);

  // Scroll to bottom of output panel whenever streamed text updates
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [streamedText, isGenerating]);

  // Utility to retrieve custom prompt options per role
  const getPromptsForRole = (role: string): string[] => {
    switch (role) {
      case "Student":
        return ["📚 Custom Study Notes", "📝 Lecture Summarizer", "✏️ Assignment Outliner", "🔬 Concept Simplifier"];
      case "Employee":
        return ["✉️ Professional Email", "📅 Meeting Minutes", "🚨 Escalation Response", "📋 Action Item Extractor"];
      case "Creator":
        return ["📹 Video Script Draft", "✍️ Social Captions", "💡 Content Ideator", "🐦 Thread Architect"];
      case "Developer":
        return ["💻 Code Explainer", "🐛 Code Debugger", "🛠️ SQL Query Generator", "📦 Architecture Advisor"];
      case "Business":
        return ["🤝 Client Relations", "📄 Proposal Builder", "📈 Business SWOT Model", "💬 Support Auto-Reply"];
      default:
        return ["⚙️ General Assistance", "💡 Creative Ideation", "🔍 Strategic Analysis"];
    }
  };

  // Sign out handler
  const handleLogout = () => {
    localStorage.removeItem("aetheris_user");
    setUser(null);
    setCurrentView("landing");
    setSidebarOpen(false);
    setProfileDropdownOpen(false);
  };

  // Onboarding success handler
  const handleOnboardingSuccess = (selectedRole: string) => {
    if (!user) return;
    const updatedUser = { ...user, role: selectedRole };
    setUser(updatedUser);
    localStorage.setItem("aetheris_user", JSON.stringify(updatedUser));
    setCurrentView("dashboard");
  };

  // Free token manager and AI streaming query executor
  const handleAICall = async () => {
    if (!promptInput.trim()) return;
    if (!user) {
      setCurrentView("auth");
      return;
    }

    // Token cap check for Free users
    if (user.tier === "free" && user.tokensUsed >= 5) {
      alert("Token threshold reached (5/5 Free Tokens). Please upgrade your console to Lite or Premium to unlock unlimited high-throughput Grok AI queries!");
      setCurrentView("pricing");
      return;
    }

    const currentPrompt = promptInput;
    setPromptInput("");
    setIsGenerating(true);
    setStreamedText("");
    setIsPaused(false);
    isPausedRef.current = false;
    isAbortedRef.current = false;

    // Create a new conversation if none is active or fresh state is preferred
    let currentConvoId = activeConvoId;
    let currentConvo = conversations.find(c => c.id === currentConvoId);

    if (!currentConvoId || !currentConvo || currentConvo.role !== user.role) {
      const newId = `convo-${Date.now()}`;
      const newC: ChatConvo = {
        id: newId,
        title: currentPrompt.substring(0, 24) + "...",
        role: user.role,
        promptType: selectedPromptType,
        history: [],
        createdAt: new Date().toISOString()
      };
      setConversations(prev => [newC, ...prev]);
      saveLocalStore("aetheris_convos", [newC, ...conversations]);
      currentConvoId = newId;
      setActiveConvoId(newId);
      currentConvo = newC;
    }

    // Push user message to local state
    const newUserMsg = { role: "user" as const, content: currentPrompt, timestamp: new Date().toISOString() };
    const updatedHistory = [...currentConvo.history, newUserMsg];

    setConversations(prev => prev.map(c => c.id === currentConvoId ? { ...c, history: updatedHistory } : c));

    try {
      const response = await fetch("/api/ai/grok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory,
          roleSelection: user.role,
          promptType: selectedPromptType
        })
      });

      if (response.ok) {
        const data = await response.json();
        setEngineUsed(data.engine || "Grok-Beta (Local Adapter)");
        
        // Simulating streaming output words dynamically
        const words = (data.content || "").split(" ");
        let tempText = "";
        for (let i = 0; i < words.length; i++) {
          if (isAbortedRef.current) {
            setStreamedText("");
            setIsGenerating(false);
            return;
          }

          while (isPausedRef.current) {
            if (isAbortedRef.current) {
              setStreamedText("");
              setIsGenerating(false);
              return;
            }
            await new Promise(r => setTimeout(r, 100));
          }

          tempText += words[i] + " ";
          setStreamedText(tempText);
          // Speed scale to simulate comfortable reading flow
          await new Promise(r => setTimeout(r, Math.random() * 40 + 15));
        }

        if (isAbortedRef.current) {
          setStreamedText("");
          setIsGenerating(false);
          return;
        }

        // Save conversation model reply
        const modelReply = { role: "model" as const, content: data.content, timestamp: new Date().toISOString() };
        const finalHistory = [...updatedHistory, modelReply];

        setConversations(prev => {
          const next = prev.map(c => c.id === currentConvoId ? { ...c, history: finalHistory } : c);
          saveLocalStore("aetheris_convos", next);
          return next;
        });

        // Increment user token usage
        const updatedUser = { ...user, tokensUsed: user.tokensUsed + 1 };
        setUser(updatedUser);
        localStorage.setItem("aetheris_user", JSON.stringify(updatedUser));

      } else {
        throw new Error("Grok service recalibrated. API channel offline.");
      }
    } catch (err) {
      console.error(err);
      if (!isAbortedRef.current) {
        setStreamedText("An error occurred during high-throughput generation. Recalibrating. Please check your GROK_API_KEY credentials or try again.");
      }
    } finally {
      setIsGenerating(false);
      setIsPaused(false);
      isPausedRef.current = false;
      isAbortedRef.current = false;
    }
  };

  // Switch conversations handler
  const handleSwitchConvo = (convoId: string) => {
    setActiveConvoId(convoId);
    setStreamedText("");
    setSidebarOpen(false); // close drawer on mobile/sidebar switch
  };

  // Start fresh chat session
  const handleNewChat = () => {
    setActiveConvoId(null);
    setStreamedText("");
    setSidebarOpen(false);
  };

  // Retrieve active conversation object
  const activeConvo = conversations.find(c => c.id === activeConvoId);

  return (
    <div className="bg-dark-void min-h-screen relative font-sans antialiased cyber-grid overflow-x-hidden text-slate-100 flex flex-col justify-between" id="applet-viewport">
      
      {/* Sticky Top Navigation Bar (Always rendered across views except auth/onboarding) */}
      {currentView !== "auth" && currentView !== "onboarding" && (
        <header className="static z-40 w-full glassmorphic border-b border-violet-500/15 backdrop-blur-xl px-6 py-4 flex items-center justify-between" id="sticky-header">
          {/* Left Brand block with toggleable drawer */}
          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/15 hover:border-violet-500/30 text-violet-300 transition-all cursor-pointer"
                title="Open Conversation History"
                id="sidebar-toggle-btn"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 p-0.5 glow-purple">
                <div className="w-full h-full bg-slate-950 rounded-md flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-100 to-pink-300 tracking-wider text-sm">
                AETHERIS AI
              </span>
            </div>
          </div>

          {/* Sticky Middle indicator */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-950/40 border border-violet-500/5 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase font-bold">
              AI WORKFLOW OPERATIONS
            </span>
          </div>

          {/* Right Navigation elements */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => setCurrentView("pricing")}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-slate-100 text-xs font-mono tracking-wider uppercase font-bold transition-all duration-300 hover:scale-105 glow-purple cursor-pointer"
            >
              UPGRADE
            </button>

            {user ? (
              <div className="relative">
                {/* Profile Trigger */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 bg-slate-950/60 hover:bg-slate-900 border border-violet-500/15 hover:border-violet-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer"
                  id="profile-dropdown-btn"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                    {user.name.substring(0, 1).toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-300 hidden sm:inline truncate max-w-[100px]">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Dropdown Menu block */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl bg-[#0f0b1c] border border-violet-500/20 shadow-2xl overflow-hidden p-1 z-50 backdrop-blur-xl"
                    >
                      <button
                        onClick={() => {
                          setShowProfileModal(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3.5 py-3 text-xs text-slate-300 hover:text-slate-100 hover:bg-violet-600/10 rounded-lg text-left font-mono"
                      >
                        <User className="w-4 h-4 text-violet-400" />
                        <span>View Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView("onboarding");
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3.5 py-3 text-xs text-slate-300 hover:text-slate-100 hover:bg-violet-600/10 rounded-lg text-left font-mono border-t border-violet-500/5"
                      >
                        <Settings className="w-4 h-4 text-cyan-400" />
                        <span>Switch Role</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3.5 py-3 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-left font-mono border-t border-violet-500/5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout Session</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView("auth")}
                className="px-4 py-2 rounded-lg bg-slate-950/60 border border-violet-500/15 hover:border-violet-500/30 text-violet-300 hover:text-slate-100 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              >
                Access Console
              </button>
            )}
          </div>
        </header>
      )}

      {/* Main Multi-Screen Content Manager */}
      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <LandingPage
              key="landing"
              onGetStarted={() => {
                if (user) setCurrentView("dashboard");
                else setCurrentView("auth");
              }}
              onOpenPricing={() => setCurrentView("pricing")}
            />
          )}

          {currentView === "auth" && (
            <LoginPage
              key="auth"
              onBackToLanding={() => setCurrentView("landing")}
              onSuccess={() => {
                // Read authenticated user state
                const currentU = localStorage.getItem("aetheris_user");
                if (currentU) {
                  const parsed = JSON.parse(currentU);
                  setUser(parsed);
                  if (!parsed.role) {
                    setCurrentView("onboarding");
                  } else {
                    setCurrentView("dashboard");
                  }
                } else {
                  setCurrentView("dashboard");
                }
              }}
            />
          )}

          {currentView === "onboarding" && (
            <OnboardingPage
              key="onboarding"
              onSuccess={handleOnboardingSuccess}
            />
          )}

          {currentView === "pricing" && (
            <PricingPage
              key="pricing"
              currentTier={user ? user.tier : "free"}
              onUpgrade={(selectedTier) => {
                if (user) {
                  const updatedU = { ...user, tier: selectedTier, tokensUsed: 0 };
                  setUser(updatedU);
                  localStorage.setItem("aetheris_user", JSON.stringify(updatedU));
                  setCurrentView("dashboard");
                } else {
                  setCurrentView("auth");
                }
              }}
              onClose={() => {
                if (user) {
                  setCurrentView("dashboard");
                } else {
                  setCurrentView("landing");
                }
              }}
            />
          )}

          {currentView === "dashboard" && user && (
            <div className="max-w-4xl mx-auto px-6 py-8 space-y-6 animate-fade-in" key="dashboard" id="workspace-grid">
              
              {/* Scrollable output panel */}
              <div className="glassmorphic-card p-6 rounded-2xl flex flex-col justify-between min-h-[400px] max-h-[500px] overflow-hidden">
                
                {/* Output Header */}
                <div className="flex justify-between items-center border-b border-violet-500/15 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">ACTIVE NEURAL RESPONDER</span>
                    <h3 className="font-display font-bold text-sm text-slate-200 mt-0.5">
                      {activeConvo ? activeConvo.title : "New Prompt Workspace Session"}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Media-like controllers for Pause/Resume and Reset/Abort */}
                    {(isGenerating || (activeConvo && activeConvo.history.length > 0)) && (
                      <div className="flex items-center bg-slate-950/60 border border-violet-500/15 rounded-lg p-0.5 space-x-1">
                        {isGenerating && (
                          <button
                            onClick={handleTogglePause}
                            className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-colors cursor-pointer flex items-center justify-center"
                            title={isPaused ? "Resume Generation" : "Pause Generation"}
                            id="btn-stream-pause"
                          >
                            {isPaused ? (
                              <Play className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
                            ) : (
                              <Pause className="w-3 h-3 text-slate-400 fill-slate-400/20" />
                            )}
                          </button>
                        )}
                        
                        {isGenerating && <div className="w-px h-3 bg-violet-500/15" />}

                        <button
                          onClick={handleResetStream}
                          className="p-1 rounded text-slate-400 hover:text-pink-400 hover:bg-slate-900 transition-colors cursor-pointer flex items-center justify-center"
                          title={isGenerating ? "Abort current generation" : "Reset conversation history"}
                          id="btn-stream-reset"
                        >
                          <Square className="w-3 h-3 text-pink-400/80 fill-pink-400/10" />
                        </button>
                      </div>
                    )}

                    <span className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 animate-pulse font-bold">
                      {isGenerating ? (isPaused ? "Paused" : "Streaming...") : engineUsed}
                    </span>
                  </div>
                </div>

                {/* Chat stream content */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 min-h-[250px] max-h-[340px]">
                  {(!activeConvo || activeConvo.history.length === 0) && !streamedText ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 opacity-60">
                      <Cpu className="w-10 h-10 text-violet-500/30 animate-pulse mb-3" />
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">Neural buffer standby</span>
                      <p className="text-xs text-slate-400 max-w-xs mt-1.5 font-light leading-relaxed">
                        Select a specialized template option below, input your context, and execute to trigger a high-throughput Grok response.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeConvo?.history.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl text-xs leading-relaxed max-w-[90%] font-sans font-light ${
                            msg.role === "user"
                              ? "bg-violet-600/10 border border-violet-500/15 text-violet-100 ml-auto"
                              : "bg-slate-950/60 border border-violet-500/5 text-slate-300 mr-auto whitespace-pre-wrap leading-relaxed markdown-body"
                          }`}
                        >
                          <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500 block mb-1">
                            {msg.role === "user" ? "USER PROMPT" : "GROK AI"}
                          </span>
                          {msg.content}
                        </div>
                      ))}

                      {/* Streamed text in progress */}
                      {streamedText && (
                        <div className="p-4 rounded-xl text-xs leading-relaxed max-w-[90%] font-sans font-light bg-slate-950/60 border border-violet-500/5 text-slate-300 mr-auto whitespace-pre-wrap">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-cyan-400 block mb-1 animate-pulse font-bold">
                            GROK AI STREAMING...
                          </span>
                          {streamedText}
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                        </div>
                      )}
                      <div ref={outputEndRef} />
                    </div>
                  )}
                </div>

                {/* Token metrics indicator */}
                <div className="border-t border-violet-500/5 pt-3.5 mt-3 flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>PLAN: {user.tier.toUpperCase()}</span>
                  <span>TOKENS USED: {user.tier === "premium" ? "UNLIMITED" : `${user.tokensUsed}/5 LIMIT`}</span>
                </div>
              </div>

              {/* Input section template selectors */}
              <div className="glassmorphic-card p-6 rounded-2xl static overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5">
                  <Sparkles className="w-16 h-16 text-violet-400" />
                </div>

                <h4 className="font-mono text-[10px] text-slate-400 tracking-widest uppercase mb-3">
                  Configure Active Persona Prompt Options ({user.role})
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {getPromptsForRole(user.role).map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedPromptType(option)}
                      className={`px-2.5 py-2.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all duration-300 border text-center cursor-pointer ${
                        selectedPromptType === option
                          ? "bg-violet-600/10 text-violet-300 border-violet-500/35 glow-purple"
                          : "bg-slate-950/40 text-slate-500 border-violet-500/5 hover:border-violet-500/15 hover:text-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Input field */}
                <div className="relative flex items-center bg-slate-950/80 border border-violet-500/10 hover:border-violet-500/20 focus-within:border-violet-500/40 rounded-xl overflow-hidden transition-all pr-2">
                  <textarea
                    rows={2}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder={`Enter custom parameters for ${selectedPromptType}...`}
                    className="flex-1 bg-transparent px-4 py-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none font-sans"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAICall();
                      }
                    }}
                  />
                  <button
                    onClick={handleAICall}
                    disabled={isGenerating || !promptInput.trim()}
                    className="p-3 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-slate-100 rounded-lg transition-all glow-purple disabled:opacity-40 disabled:scale-100 scale-105 cursor-pointer flex items-center justify-center shrink-0"
                    title="Generate content"
                    id="generate-prompt-btn"
                  >
                    <Send className="w-4 h-4 text-slate-100" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide-out Conversations Drawer (Requirement 5a) */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex" id="conversations-sidebar-drawer">
            {/* Overlay backdrop click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/80"
            />

            {/* Main Drawer container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="relative w-80 max-w-sm h-full bg-[#0a0715] border-r border-violet-500/15 p-6 flex flex-col justify-between backdrop-blur-xl"
            >
              <div className="space-y-6 flex-1 overflow-hidden flex flex-col">
                {/* Header title */}
                <div className="flex justify-between items-center pb-3 border-b border-violet-500/10">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                    <span className="font-display font-bold text-sm tracking-wide text-slate-100">Saved Conversations</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-950 border border-violet-500/10 text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Fresh New Chat trigger */}
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/20 hover:border-violet-500/35 text-violet-300 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Start Fresh Chat</span>
                </button>

                {/* List container */}
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1.5">
                  <div className="px-1.5 mb-2">
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Historical Nodes</span>
                  </div>

                  {conversations.length === 0 ? (
                    <div className="py-12 text-center text-slate-600 font-mono text-[10px]">
                      No previous sessions found.
                    </div>
                  ) : (
                    conversations.map((convo) => {
                      const isActive = convo.id === activeConvoId;
                      return (
                        <div
                          key={convo.id}
                          className={`w-full group rounded-lg flex items-center justify-between p-2.5 transition-colors ${
                            isActive
                              ? "bg-violet-600/15 border border-violet-500/20 text-violet-200"
                              : "hover:bg-slate-900/40 text-slate-400 border border-transparent"
                          }`}
                        >
                          <button
                            onClick={() => handleSwitchConvo(convo.id)}
                            className="flex-1 text-left min-w-0 font-sans text-xs tracking-wide truncate pr-2 cursor-pointer"
                          >
                            <span className="block font-medium truncate text-slate-300 group-hover:text-slate-200">
                              {convo.title}
                            </span>
                            <span className="block font-mono text-[8px] text-slate-500 uppercase mt-0.5">
                              {convo.role} &bull; {convo.promptType.split(" ").pop()}
                            </span>
                          </button>
                          
                          {/* Delete convo icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = conversations.filter(c => c.id !== convo.id);
                              setConversations(updated);
                              saveLocalStore("aetheris_convos", updated);
                              if (activeConvoId === convo.id) {
                                setActiveConvoId(updated.length > 0 ? updated[0].id : null);
                              }
                            }}
                            className="p-1.5 opacity-0 group-hover:opacity-100 hover:text-rose-400 text-slate-500 transition-all rounded"
                            title="Purge session history"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Status footer inside drawer */}
              <div className="pt-4 border-t border-violet-500/10">
                <div className="p-3 bg-slate-950/40 rounded-lg border border-violet-500/5 text-center flex items-center justify-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[9px] text-slate-500 uppercase">
                    {isSupabaseConfigured ? "Supabase Synced" : "Local persistent database"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      {/* Profile Details Modal Popup (Requirement 4a - view profile) */}
      <AnimatePresence>
        {showProfileModal && user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6" id="profile-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/80"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0d091a] border border-violet-500/20 rounded-2xl shadow-2xl p-6 overflow-hidden backdrop-blur-xl z-10"
            >
              <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                <Cpu className="w-24 h-24 text-violet-400" />
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-violet-500/10 mb-5">
                <span className="font-display font-bold text-sm text-slate-200">Active Node Profile</span>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-1 rounded-lg bg-slate-950 border border-violet-500/10 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-slate-950 font-display font-bold text-lg">
                    {user.name.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-200">{user.name}</h4>
                    <p className="text-[10px] font-mono text-slate-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="bg-slate-950/40 border border-violet-500/5 p-3 rounded-lg text-center">
                    <span className="font-mono text-[8px] text-slate-500 uppercase block">Active Persona</span>
                    <span className="font-display font-semibold text-xs text-slate-300 mt-1 block">
                      {user.role}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 border border-violet-500/5 p-3 rounded-lg text-center">
                    <span className="font-mono text-[8px] text-slate-500 uppercase block">Access Tier</span>
                    <span className="font-display font-semibold text-xs text-pink-400 mt-1 block uppercase">
                      {user.tier}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-violet-500/5 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>GROK CONSOLE NODE: UNRESTRICTED</span>
                  <span>TOKENS ACTIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Branding Area */}
      {currentView === "landing" && (
        <footer className="py-6 border-t border-violet-500/10 text-center font-mono text-[10px] text-slate-600 mt-8">
          <span>© 2026 AETHERIS COGNITIVE SYSTEMS. PLATFORM DEPLOYED TO SECURE CONTAINERS.</span>
        </footer>
      )}

    </div>
  );
}
