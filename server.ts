import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini Client Lazily/Safely
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI features will run in mock mode.");
      throw new Error("GEMINI_API_KEY environment variable is required for real AI processing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const app = express();
app.use(express.json());

const PORT = 3000;

// Temporary in-memory database to allow persistent behavior when Supabase is not connected yet
let serverTasks: any[] = [];
let serverHabits: any[] = [];

// Initialize simple seed data if empty
if (serverTasks.length === 0) {
  serverTasks = [
    {
      id: "seed-1",
      title: "Establish daily meditation habit",
      description: "Perform 10 minutes of box breathing before work to stabilize focus.",
      priority: "IMPORTANT_NOT_URGENT",
      completed: false,
      createdAt: new Date().toISOString(),
      category: "Health",
      cognitiveLoad: 1,
      subtasks: [],
      estimatedMinutes: 10
    },
    {
      id: "seed-2",
      title: "Analyze marketing pipeline drop-off",
      description: "Deep dive into Mixpanel data to discover why checkout drop-off surged 12%.",
      priority: "URGENT_IMPORTANT",
      completed: false,
      createdAt: new Date().toISOString(),
      category: "Work",
      cognitiveLoad: 4,
      subtasks: [
        { id: "sub-1", title: "Export Mixpanel CSV data", completed: false },
        { id: "sub-2", title: "Map funnel conversion steps", completed: false },
        { id: "sub-3", title: "Formulate core drop-off hypothesis", completed: false }
      ],
      estimatedMinutes: 90
    }
  ];
}

if (serverHabits.length === 0) {
  serverHabits = [
    {
      id: "habit-1",
      name: "Box Breathing Focus",
      description: "Calm the central nervous system before coding.",
      frequency: "daily",
      streakCount: 5,
      bestStreak: 12,
      lastLoggedDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
      history: [
        new Date(Date.now() - 86400000).toISOString().split('T')[0],
        new Date(Date.now() - 172800000).toISOString().split('T')[0],
        new Date(Date.now() - 259200000).toISOString().split('T')[0]
      ],
      createdAt: new Date().toISOString(),
      category: "Health",
      color: "#06b6d4"
    },
    {
      id: "habit-2",
      name: "Read Technical Articles",
      description: "Read 1 paper on system architecture.",
      frequency: "daily",
      streakCount: 3,
      bestStreak: 5,
      lastLoggedDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      history: [
        new Date(Date.now() - 86400000).toISOString().split('T')[0],
        new Date(Date.now() - 172800000).toISOString().split('T')[0]
      ],
      createdAt: new Date().toISOString(),
      category: "Learning",
      color: "#ec4899"
    }
  ];
}

// REST Endpoints for general sync (Supabase fallbacks)
app.get("/api/tasks", (req, res) => {
  res.json(serverTasks);
});

app.post("/api/tasks", (req, res) => {
  const newTask = {
    ...req.body,
    id: req.body.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: req.body.createdAt || new Date().toISOString(),
    subtasks: req.body.subtasks || []
  };
  serverTasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = serverTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    serverTasks[index] = { ...serverTasks[index], ...req.body };
    res.json(serverTasks[index]);
  } else {
    // If not found, append as new
    const newTask = { id, ...req.body };
    serverTasks.push(newTask);
    res.json(newTask);
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  serverTasks = serverTasks.filter(t => t.id !== id);
  res.json({ success: true });
});

app.get("/api/habits", (req, res) => {
  res.json(serverHabits);
});

app.post("/api/habits", (req, res) => {
  const newHabit = {
    ...req.body,
    id: req.body.id || `habit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: req.body.createdAt || new Date().toISOString(),
    streakCount: req.body.streakCount || 0,
    bestStreak: req.body.bestStreak || 0,
    history: req.body.history || []
  };
  serverHabits.push(newHabit);
  res.status(201).json(newHabit);
});

app.put("/api/habits/:id", (req, res) => {
  const { id } = req.params;
  const index = serverHabits.findIndex(h => h.id === id);
  if (index !== -1) {
    serverHabits[index] = { ...serverHabits[index], ...req.body };
    res.json(serverHabits[index]);
  } else {
    const newHabit = { id, ...req.body };
    serverHabits.push(newHabit);
    res.json(newHabit);
  }
});

app.delete("/api/habits/:id", (req, res) => {
  const { id } = req.params;
  serverHabits = serverHabits.filter(h => h.id !== id);
  res.json({ success: true });
});

// Check if environment has real Supabase configuration
app.get("/api/config/supabase", (req, res) => {
  const hasSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
  res.json({
    isConfigured: hasSupabase,
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_ANON_KEY ? "CONFIGURED_SECRET" : ""
  });
});

// AI prioritizing endpoint using Google GenAI
app.post("/api/ai/prioritize", async (req, res) => {
  try {
    const { tasks } = req.body;
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ error: "Missing or invalid tasks array" });
    }

    try {
      const ai = getGeminiClient();
      
      const prompt = `You are the Aetheris Cognitive Productivity Engine. Analyze the following list of tasks and recommend optimization.
      For each task, analyze its urgency, true cognitive weight, and output:
      1. Recommended Priority Quadrant (URGENT_IMPORTANT, IMPORTANT_NOT_URGENT, URGENT_NOT_IMPORTANT, NOT_URGENT_NOT_IMPORTANT).
      2. Suggested Cognitive Load Score (integer 1 to 5, where 1 is mechanical/low effort and 5 is intense focus).
      3. Estimated completion minutes.
      
      Also, write a high-value, professional 3-sentence summary analysis addressing the user's cognitive state, highlighting potential bottlenecks, and suggesting where to start to build momentum.
      
      Tasks list:
      ${JSON.stringify(tasks.map(t => ({ id: t.id, title: t.title, description: t.description, category: t.category })))}
      
      Return ONLY a JSON response matching this schema:
      {
        "tasks": [
          {
            "id": "original_task_id",
            "recommendedPriority": "QUADRANT_VALUE",
            "cognitiveLoad": 3,
            "estimatedMinutes": 45
          }
        ],
        "analysis": "Three-sentence coaching summary."
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    recommendedPriority: { type: Type.STRING },
                    cognitiveLoad: { type: Type.INTEGER },
                    estimatedMinutes: { type: Type.INTEGER }
                  },
                  required: ["id", "recommendedPriority", "cognitiveLoad", "estimatedMinutes"]
                }
              },
              analysis: { type: Type.STRING }
            },
            required: ["tasks", "analysis"]
          }
        }
      });

      const resultText = response.text?.trim() || "{}";
      const resultJson = JSON.parse(resultText);
      res.json(resultJson);
    } catch (aiErr) {
      console.error("Gemini Priority Error, returning elegant mock response:", aiErr);
      
      // Elegant simulated AI response in case API key is missing or model fails
      const simulatedTasks = tasks.map((t, idx) => {
        const quadrants = ["URGENT_IMPORTANT", "IMPORTANT_NOT_URGENT", "URGENT_NOT_IMPORTANT", "NOT_URGENT_NOT_IMPORTANT"];
        return {
          id: t.id,
          recommendedPriority: quadrants[idx % 4],
          cognitiveLoad: Math.floor(Math.random() * 4) + 1,
          estimatedMinutes: (idx + 1) * 20 + 15
        };
      });

      res.json({
        tasks: simulatedTasks,
        analysis: "Your cognitive stack is currently dense. We recommend tackling lower friction tasks (like box breathing or email sorting) first to grease the neural pathways before tackling deep creative deliverables.",
        isSimulated: true
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI task decomposer (subtask generator)
app.post("/api/ai/decompose", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    try {
      const ai = getGeminiClient();
      const prompt = `You are the Aetheris task decomposition utility. Take this task and break it down into 3 to 5 small, highly discrete, logical, and practical steps (subtasks).
      
      Task: ${title}
      Description: ${description || "None provided"}
      
      Return ONLY a JSON response matching this schema:
      {
        "subtasks": [
          { "title": "Subtask text description" }
        ]
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subtasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING }
                  },
                  required: ["title"]
                }
              }
            },
            required: ["subtasks"]
          }
        }
      });

      const resultText = response.text?.trim() || "{}";
      res.json(JSON.parse(resultText));
    } catch (aiErr) {
      console.error("Gemini Decompose Error, returning mock subtasks:", aiErr);
      // Fallback decomposition
      res.json({
        subtasks: [
          { title: "Define constraints and clear goals" },
          { title: "Review reference materials and assets" },
          { title: "Build the initial structure or outline" },
          { title: "Polish, test, and perform QA checks" }
        ],
        isSimulated: true
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// AI Coach chat stream / response proxy
app.post("/api/ai/coach", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages list is required" });
    }

    try {
      const ai = getGeminiClient();
      
      // Transform client messages to Google GenAI schema format
      const formattedContents = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const systemInstruction = `You are AETHERIS COGNITIVE AGENT, an elite productivity strategist and human potential coach operating within a premium glassmorphic digital console.
      - Your persona is intellectual, calm, highly constructive, and slightly cyber-aesthetic (using phrases like 'optimizing cognitive bandwidth', 'neural slotting', and 'flow calibration').
      - Help the user prioritize their task list, overcome procrastination, design elegant morning loops, and calibrate mental stress levels.
      - Keep responses highly actionable, sleek, and structured (using clean markdown spacing, bullet points, and high contrast headers).
      - Never use dry, generic, or clinical developer text. Stay immersive. Avoid excessive exclamation marks; write with quiet, confident competence.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction
        }
      });

      res.json({
        content: response.text || "I was unable to synthesize a productivity roadmap. Please recalibrate.",
        timestamp: new Date().toISOString()
      });
    } catch (aiErr) {
      console.error("Gemini Coach Chat Error, using mock responder:", aiErr);
      
      // Adaptive mock fallback based on user message
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let simulatedReply = "My neural engine is currently operating in offline backup mode. Let us calibrate your cognitive bandwidth locally. Focus on creating deep, uninterrupted focus blocks today.";
      
      if (lastUserMsg.includes("priorit") || lastUserMsg.includes("task")) {
        simulatedReply = "Calibrating prioritization. Let us map your active stack. Categorize your items into high-intensity creative and low-intensity mechanical. Execute the highest resistance task during your peak physiological focus window.";
      } else if (lastUserMsg.includes("habit") || lastUserMsg.includes("streak")) {
        simulatedReply = "Streaks represent habit crystallization. The primary key is friction reduction. If you are struggling with daily box breathing, reduce the friction to just 1 minute. Consistency builds structural pathways before duration.";
      } else if (lastUserMsg.includes("stress") || lastUserMsg.includes("tired")) {
        simulatedReply = "An elevated cognitive load drains your decision matrix. Reduce active context-switching immediately. Close excess browser nodes, take 4 cycles of box breathing, and complete 1 simple low-intensity task to release dopamine.";
      }

      res.json({
        content: `[Simulation Node] ${simulatedReply}`,
        timestamp: new Date().toISOString(),
        isSimulated: true
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Grok AI API / adapter endpoint
app.post("/api/ai/grok", async (req, res) => {
  try {
    const { messages, roleSelection, promptType } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Safely check and clean any GROK API key from environments
    const rawKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY || "";
    const cleanGrokKey = rawKey.trim().replace(/['"]/g, "");
    
    // Check if it is a real key, avoiding placeholder/empty configs
    const hasRealGrokKey = cleanGrokKey && 
                           cleanGrokKey !== "null" && 
                           cleanGrokKey !== "undefined" && 
                           cleanGrokKey.length > 8;

    const systemPrompt = `You are Grok AI (xAI Engine), embedded inside the Aetheris AI Workflow console.
    Your output must be specifically tailored for the user's role: "${roleSelection || "General User"}" 
    and task type: "${promptType || "Custom Assistance"}".
    
    Guidelines:
    1. Respond with Grok's trademark wit, sharp intelligence, high-accuracy, and logical brilliance.
    2. Format output elegantly using Markdown: clear headers, structured lists, and bold parameters.
    3. Stay highly practical. Provide exact answers, functional code snippets, outlines, or outlines suited for the chosen role.
    4. Keep answers concise, highly engaging, and clear. Avoid robotic preamble.`;

    if (hasRealGrokKey) {
      console.log("Routing query to live xAI Grok-2 API channel...");
      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cleanGrokKey}`
          },
          body: JSON.stringify({
            model: "grok-2",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.map(m => ({ role: m.role === "model" ? "assistant" : m.role, content: m.content }))
            ],
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return res.json({
              content,
              timestamp: new Date().toISOString(),
              engine: "Grok-2 (Real-Time)"
            });
          }
        }
        console.log("xAI Grok-2 API responded with non-200, transitioning to adapter node.");
      } catch (err) {
        console.log("xAI Grok-2 API connect skipped, transitioning to adapter node.");
      }
    }

    // Fallback translation: Use Gemini with Grok system instructions
    try {
      console.log("Operating in Grok-to-Gemini translation mode.");
      const ai = getGeminiClient();
      
      const formattedContents = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt
        }
      });

      res.json({
        content: response.text || "Recalibrating Grok cognitive stream. Please input a stronger neural prompt.",
        timestamp: new Date().toISOString(),
        engine: "Grok-Beta (Gemini Adapter Node)"
      });
    } catch (aiErr) {
      console.log("Activating simulated Grok cognitive core.");
      
      const lastMsg = messages[messages.length - 1]?.content || "";
      let mockContent = `### Grok xAI Analysis Core

I have parsed your prompt regarding **"${lastMsg}"** for the role of **${roleSelection || "General User"}**. 

Here is my high-throughput output matrix:
1. **Strategic Intent**: Establish clear objectives, removing redundant friction loops in your execution stack.
2. **Key Milestones**:
   - *Phase Alpha*: Structure inputs, validating syntax and dependencies.
   - *Phase Beta*: Compile iteratively and check console outputs.
   - *Phase Gamma*: Deploy to hosting nodes, auditing memory throughput.
3. **Core Actionable Recommendation**: Prioritize your task list using the Eisenhower Matrix. Clear out the 1-2 urgent items today before attempting micro-tasks.

*Grok engine currently running in local offline simulation mode. Configure GROK_API_KEY to activate full real-time neural web searching capabilities.*`;

      res.json({
        content: mockContent,
        timestamp: new Date().toISOString(),
        engine: "Grok-Beta (Simulated Core)"
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// Handle Vite middleware / Production routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AETHERIS server active on port ${PORT}`);
  });
}

startServer();
