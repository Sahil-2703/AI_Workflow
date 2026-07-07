import React, { useState } from "react";
import { Sparkles, Mail, Lock, User, Github, AlertCircle, ArrowLeft, Chrome, Terminal, Send, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

interface LoginPageProps {
  onBackToLanding: () => void;
  onSuccess: () => void;
  key?: string;
}

export default function LoginPage({ onBackToLanding, onSuccess }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Direct high quality login flow simulation that automatically authenticates user
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Store mock user state
      const mockUser = {
        id: `usr-${Date.now()}`,
        email: email || "user@example.com",
        name: fullName || email.split("@")[0] || "Aetheris Nomad",
        role: "Creator",
        tier: "free",
        tokensUsed: 0,
      };
      localStorage.setItem("aetheris_user", JSON.stringify(mockUser));
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Credential authentication failed. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: `social-${Date.now()}`,
        email: `${provider.toLowerCase()}@aetheris-node.ai`,
        name: `${provider} Integrator`,
        role: "Developer",
        tier: "free",
        tokensUsed: 0,
      };
      localStorage.setItem("aetheris_user", JSON.stringify(mockUser));
      onSuccess();
    } catch (err: any) {
      setError(`Failed to authenticate with ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between py-8 px-6 md:px-12 relative overflow-hidden font-sans text-slate-100" id="auth-panel">
      {/* Background Soft Ambient Purple/Indigo Flare */}
      <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      
      {/* TOP HEADER */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={onBackToLanding}>
          <span className="font-display font-black tracking-wider text-xl text-slate-100 uppercase">
            Aetheris AI
          </span>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-slate-900 bg-slate-950/80 text-slate-400 font-mono text-[9px] tracking-widest uppercase">
          SYSTEM ONLINE: V4.2.0
        </div>
      </header>

      {/* CENTRAL AUTH CARD */}
      <main className="flex-1 flex items-center justify-center py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[430px] bg-slate-950/40 border border-slate-900 rounded-[2rem] px-8 py-10 shadow-2xl relative overflow-hidden flex flex-col"
        >
          {/* Decorative Subtle Grid Lines or Sparkle */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-20 h-20 text-violet-400" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-sans font-black text-3xl md:text-4xl text-slate-100 tracking-tight mb-2">
              {isSignUp ? "Create Identity" : "Welcome Back"}
            </h2>
            <p className="text-xs text-slate-400 font-sans font-light tracking-wide">
              {isSignUp ? "Deploy your node onto the Aetheris ecosystem" : "Enter the neural gates of Aetheris"}
            </p>
          </div>

          <form onSubmit={handleCredentialsAuth} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block font-mono text-[9px] text-violet-400/90 uppercase tracking-widest font-bold mb-1.5">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Arthur Dent"
                  className="w-full bg-white text-slate-900 font-sans px-4 py-3 rounded-xl text-xs focus:outline-none transition-all placeholder-slate-400 font-medium shadow-md"
                />
              </div>
            )}

            <div>
              <label className="block font-mono text-[9px] text-violet-400/90 uppercase tracking-widest font-bold mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@aetheris.ai"
                className="w-full bg-white text-slate-900 font-sans px-4 py-3 rounded-xl text-xs focus:outline-none transition-all placeholder-slate-400 font-medium shadow-md"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block font-mono text-[9px] text-violet-400/90 uppercase tracking-widest font-bold">
                  PASSWORD
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset protocol initiated.")}
                    className="text-[10px] text-violet-400 hover:text-violet-300 font-sans font-semibold cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white text-slate-900 font-sans px-4 py-3 pr-10 rounded-xl text-xs focus:outline-none transition-all placeholder-slate-400 font-medium shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox row */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="stay-connected"
                className="w-4 h-4 rounded bg-slate-900 border border-slate-800 text-violet-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                defaultChecked
              />
              <label htmlFor="stay-connected" className="text-[10px] font-mono text-slate-400 tracking-wider cursor-pointer">
                Stay connected across dimensions
              </label>
            </div>

            {error && (
              <div className="flex items-start space-x-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-slate-100 font-mono text-xs tracking-widest uppercase font-extrabold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-violet-500/20 glow-purple flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? "INITIATING..." : isSignUp ? "DEPLOY IDENTITY" : "INITIATE ACCESS"}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-[1px] bg-slate-900" />
            <span className="px-3 font-mono text-[8px] text-slate-600 tracking-widest uppercase font-bold">
              PROTOCOL SYNC
            </span>
            <div className="flex-1 h-[1px] bg-slate-900" />
          </div>

          {/* Social login matrix */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialAuth("Google")}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-slate-900 hover:border-slate-800 bg-slate-950/20 text-xs font-mono text-slate-300 hover:text-slate-100 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleSocialAuth("GitHub")}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-slate-900 hover:border-slate-800 bg-slate-950/20 text-xs font-mono text-slate-300 hover:text-slate-100 transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Create identity toggle */}
          <div className="mt-8 text-center pt-3 border-t border-slate-900/60">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setIsSignUp(!isSignUp);
              }}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              {isSignUp ? (
                <>
                  Already registered? <span className="text-violet-400 font-bold hover:underline">Authenticate Here</span>
                </>
              ) : (
                <>
                  New Architect? <span className="text-violet-400 font-bold hover:underline">Create Identity</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </main>

      {/* BOTTOM FOOTER */}
      <footer className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 pt-4 border-t border-slate-900/40">
        <div className="flex items-center space-x-2 font-mono text-[9px] text-slate-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LATENCY: 14MS</span>
        </div>
        <div className="font-mono text-[9px] text-slate-500 tracking-wider">
          NODE: XEON-9 &nbsp;&nbsp; 256-BIT ENCRYPTED
        </div>
      </footer>
    </div>
  );
}
