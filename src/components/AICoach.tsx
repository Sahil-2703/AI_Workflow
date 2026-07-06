import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Cpu, 
  Terminal, 
  Sparkles, 
  ShieldAlert, 
  Zap,
  RefreshCw,
  CornerDownLeft,
  Smile,
  AlertTriangle
} from "lucide-react";
import { ChatMessage } from "../types";

interface AICoachProps {
  tasks: any[];
  habits: any[];
}

export default function AICoach({ tasks, habits }: AICoachProps) {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Aetheris Cognitive Coach online. System bandwidth synchronized. How can we calibrate your neural focus state or reorganize your operational priorities today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Quick Action Buttons to trigger specific coaching guides
  const quickActions = [
    {
      id: "burnout",
      label: "BURNOUT DRIFT",
      prompt: "I am feeling heavily overwhelmed with my current workload. Deconstruct a clear burnout recovery plan and tell me which types of tasks I should pause immediately to recover bandwidth.",
      icon: ShieldAlert
    },
    {
      id: "procrastination",
      label: "ACTION BLOCKER",
      prompt: "I am procrastinating on my heaviest creative deliverable. Guide me through a 5-minute micro-activation sequence to release dopamine and initiate flow.",
      icon: Zap
    },
    {
      id: "tomorrow",
      label: "CHRONOS MAP",
      prompt: "Help me design an optimized chronological morning flow block for tomorrow, integrating task execution, box breathing, and focus recharges.",
      icon: Terminal
    }
  ];

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Append some active system metadata about current task counts for hyper-personalized coaching!
      const activeTasksSummary = tasks.filter(t => !t.completed).map(t => `${t.title} (${t.priority})`).join(", ");
      const habitsSummary = habits.map(h => `${h.name} (${h.streakCount}d streak)`).join(", ");
      
      const contextPrompt = `User current system telemetry context:
      Active Task list: ${activeTasksSummary || "No active tasks recorded."}
      Logged Habits: ${habitsSummary || "No habit nodes active."}
      
      User Message: ${textToSend}`;

      // Call the server-side Gemini API proxy route
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send previous messages history plus the current context for model continuity
          messages: [
            ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: contextPrompt }
          ]
        })
      });

      const data = await response.json();

      if (data.content) {
        // Strip simulator tag if returning from mock mode
        const cleanContent = data.content.replace("[Simulation Node] ", "");
        const modelMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          role: "model",
          content: cleanContent,
          timestamp: data.timestamp || new Date().toISOString()
        };
        setMessages(prev => [...prev, modelMsg]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("AI Coach connection error:", err);
      // Fallback local response
      const errMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content: "Operational connection to Gemini lost. Reverting to basic local safety routines: We suggest closing all distracting tabs, closing chat for 25 minutes, and completing 1 simple task.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: "Bandwidth recalibrated. Neural buffer cleared. Tell me, how can we calibrate your operational focus block today?",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col justify-between p-1" id="cognitive-ai-coach-view">
      
      {/* Header bar */}
      <div className="flex justify-between items-center pb-4 border-b border-violet-500/10">
        <div>
          <h2 className="font-display font-semibold text-3xl text-slate-100 flex items-center gap-3">
            Cognitive AI Coach <span className="text-violet-400 font-mono text-sm tracking-widest font-normal bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">NODE_3.5_FLASH</span>
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-0.5">
            Interact with the Aetheris productivity architect to overcome friction barriers and design morning loops.
          </p>
        </div>

        {/* Clear terminal trigger */}
        <button
          onClick={handleClearHistory}
          className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 border border-violet-500/10 hover:border-violet-500/25 text-slate-400 hover:text-slate-200 text-[10px] font-mono rounded-lg transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>REBOOT CONSOLE</span>
        </button>
      </div>

      {/* Main Terminal Grid: Split Conversational Screen & Quick Actions Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
        
        {/* Chat Terminal Core (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/40 border border-violet-500/10 rounded-2xl flex flex-col justify-between overflow-hidden relative glassmorphic">
          
          {/* Top terminal tab bar */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-violet-500/10 flex justify-between items-center font-mono text-[9px] text-slate-500 tracking-wider">
            <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-violet-400" /> AETHERIS://COGNITIVE_TERMINAL_01_SECURE</span>
            <span className="text-emerald-400 animate-pulse">● CALIBRATED</span>
          </div>

          {/* Dialog Bubble Deck */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m) => {
              const isModel = m.role === "model";
              return (
                <div
                  key={m.id}
                  className={`flex ${isModel ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 border text-xs leading-relaxed font-light ${
                      isModel
                        ? "bg-slate-950/80 border-violet-500/10 text-slate-300 rounded-tl-none font-mono"
                        : "bg-gradient-to-tr from-violet-600/15 to-pink-500/5 border-violet-500/20 text-slate-100 rounded-tr-none font-sans"
                    }`}
                  >
                    {/* Header Role info */}
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-violet-500/5 font-mono text-[9px] text-slate-500">
                      <span className="font-bold tracking-widest">
                        {isModel ? "AETHERIS_AGENT_COACH" : "OPERATOR_CLIENT_NODE"}
                      </span>
                      <span>
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Content text (Support simple split paragraph renderings) */}
                    <div className="whitespace-pre-line text-[11px]">
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating active loader */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-950 border border-violet-500/10 rounded-2xl rounded-tl-none p-4 max-w-[50%]">
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-4 h-4 text-violet-400 animate-spin" />
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                      CALIBRATING SYNTHESIS NODE...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Form input field bar */}
          <form onSubmit={handleSubmitForm} className="p-4 bg-slate-950 border-t border-violet-500/10 flex space-x-3 items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Query focus calibrations (e.g. Help me structure my high cognitive weight work today...)"
              className="flex-1 bg-slate-950 border border-violet-500/15 hover:border-violet-500/30 focus:border-violet-500/50 rounded-xl px-4 py-3.5 text-xs text-slate-200 focus:outline-none transition-colors"
            />
            
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-slate-100 transition-all duration-300 glow-purple disabled:opacity-40 flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Side: Quick calibration Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-950/40 border border-violet-500/10 p-5 rounded-2xl glassmorphic space-y-4">
            <div className="flex items-center space-x-2 pb-2.5 border-b border-violet-500/10">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h4 className="font-display font-semibold text-[11px] text-slate-300 uppercase tracking-widest">
                RAPID COGNITIVE INJECTIONS
              </h4>
            </div>

            <p className="text-[11px] text-slate-400 font-sans font-light leading-relaxed">
              Inject these pre-synthesized telemetry requests into your active Coach pipeline to resolve immediate blockages.
            </p>

            <div className="space-y-3 pt-1">
              {quickActions.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleSendMessage(act.prompt)}
                    className="w-full flex items-center justify-between text-left p-3.5 bg-slate-950/60 border border-violet-500/10 hover:border-violet-500/25 rounded-xl hover:bg-violet-500/5 group transition-all duration-300 text-xs font-mono tracking-wider text-slate-300"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-violet-400 transition-transform duration-300 group-hover:scale-110" />
                      <span>{act.label}</span>
                    </div>
                    <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 group-hover:text-violet-400 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick coaching safety alert */}
          <div className="border border-violet-500/5 p-4 rounded-2xl bg-gradient-to-tr from-pink-500/5 to-rose-500/0 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-pink-400 shrink-0" />
            <div className="leading-tight">
              <h5 className="font-mono text-[10px] text-pink-400 font-bold uppercase tracking-wider">Neural Safety Override</h5>
              <p className="text-[10px] text-slate-500 font-sans font-light mt-1">
                If your active load is above 80% for more than 4 hours, system guidelines suggest initiating manual shutdown (screen-free rest).
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
