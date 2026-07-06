import React, { useState } from "react";
import { Sparkles, Mail, Lock, User, Github, AlertCircle, ArrowLeft, Chrome, Terminal, Send } from "lucide-react";
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
    <div className="min-h-screen bg-dark-void flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden" id="auth-panel">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[110px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToLanding}
          className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 text-xs font-mono tracking-wider uppercase bg-slate-950/40 hover:bg-slate-900 border border-violet-500/10 px-3.5 py-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 p-0.5 glow-purple mb-4">
          <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-violet-400" />
          </div>
        </div>
        <h2 className="font-display font-bold text-3xl text-slate-100 tracking-tight">
          {isSignUp ? "Create Your Intellect Node" : "Access Console Node"}
        </h2>
        <p className="mt-2 text-xs text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
          Unlock personalized Grok workflows and synchronize priorities with local persistent caches.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glassmorphic p-8 rounded-2xl border border-violet-500/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-24 h-24 text-violet-400" />
          </div>

          <form className="space-y-5 relative z-10" onSubmit={handleCredentialsAuth}>
            {isSignUp && (
              <div>
                <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Arthur Dent"
                    className="w-full bg-slate-950/80 border border-violet-500/10 hover:border-violet-500/20 focus:border-violet-500/40 pl-10 pr-3.5 py-2.5 rounded-lg text-xs font-sans text-slate-200 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                Secure Email Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950/80 border border-violet-500/10 hover:border-violet-500/20 focus:border-violet-500/40 pl-10 pr-3.5 py-2.5 rounded-lg text-xs font-sans text-slate-200 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                Passphrase
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-violet-500/10 hover:border-violet-500/20 focus:border-violet-500/40 pl-10 pr-3.5 py-2.5 rounded-lg text-xs font-sans text-slate-200 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start space-x-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-slate-100 font-mono text-xs tracking-wider uppercase font-bold transition-all duration-300 hover:shadow-lg glow-purple cursor-pointer flex items-center justify-center space-x-2.5 disabled:opacity-50"
            >
              <span>{isLoading ? "PROVISONING ACCESS..." : isSignUp ? "PROVISION NODE" : "INITIALIZE SESSION"}</span>
              {!isLoading && <Send className="w-3.5 h-3.5" />}
            </button>
          </form>

          {/* Social Sign In Separator */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-500/10" />
            </div>
            <div className="relative flex justify-center text-xs font-mono uppercase">
              <span className="px-3 bg-[#0d0a18]/90 text-slate-500 text-[10px] tracking-widest">
                Social Sign-In Channels
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialAuth("Google")}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg bg-slate-950/40 border border-violet-500/10 hover:border-violet-500/20 hover:bg-slate-900/60 text-xs font-mono text-slate-300 transition-all cursor-pointer"
            >
              <Chrome className="w-4 h-4" />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleSocialAuth("GitHub")}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-lg bg-slate-950/40 border border-violet-500/10 hover:border-violet-500/20 hover:bg-slate-900/60 text-xs font-mono text-slate-300 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="mt-6 text-center pt-3 border-t border-violet-500/5">
            <button
              onClick={() => {
                setError(null);
                setIsSignUp(!isSignUp);
              }}
              className="text-xs text-violet-400 hover:text-violet-300 font-sans tracking-wide transition-colors cursor-pointer"
            >
              {isSignUp ? "Already have a node? Authenticate here" : "Need a node? Deploy your secure credentials"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
