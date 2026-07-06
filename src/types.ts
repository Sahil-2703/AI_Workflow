export enum PriorityLevel {
  URGENT_IMPORTANT = "URGENT_IMPORTANT", // Focus Now
  IMPORTANT_NOT_URGENT = "IMPORTANT_NOT_URGENT", // Schedule
  URGENT_NOT_IMPORTANT = "URGENT_NOT_IMPORTANT", // Delegate/Outsource
  NOT_URGENT_NOT_IMPORTANT = "NOT_URGENT_NOT_IMPORTANT", // Eliminate
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: PriorityLevel;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  category: string; // e.g., "Work", "Personal", "Health", "Learning"
  cognitiveLoad: number; // 1 to 5 scale representing mental strain
  subtasks: SubTask[];
  estimatedMinutes?: number;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: "daily" | "weekly";
  streakCount: number;
  bestStreak: number;
  lastLoggedDate?: string; // ISO date string (YYYY-MM-DD)
  history: string[]; // List of YYYY-MM-DD strings representing logged completions
  createdAt: string;
  category: string;
  color: string; // Hex or tailwind class for personalized highlights
}

export interface CognitiveState {
  currentLoad: number; // calculated scale
  maxLoad: number; // 100
  advice: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  useFallback: boolean;
}
