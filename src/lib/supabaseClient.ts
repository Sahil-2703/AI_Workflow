import { createClient } from "@supabase/supabase-js";

// Retrieve VITE_ prefixed env variables on client side casting to any for TypeScript compilation safety
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || "";
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Safely initialize Supabase
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Simulated standard tables logic for client side if offline
export const getLocalStore = (key: string, defaultValue: any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const saveLocalStore = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

