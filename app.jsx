import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket, useQuery } from "@websim/use-query";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, Plane, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  Save,
  Share2,
  Trophy,
  Users,
  FileText,
  Settings,
  Sparkles,
  MessageSquare,
  Archive,
  Zap,
  Globe
} from "lucide-react";
const room = new WebsimSocket();
function AnimatedSphere({ position, color = "#ff6b6b" }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  return /* @__PURE__ */ jsxDEV(Sphere, { ref: meshRef, position, args: [0.5, 32, 32], children: /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color, metalness: 0.8, roughness: 0.2 }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 30,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}
function Scene3D({ sceneData, isPlaying }) {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [camera, gl]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(Environment, { preset: "sunset" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.5 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [10, 10, 10], intensity: 1 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      Plane,
      {
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -1, 0],
        args: [20, 20],
        children: /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#4a5568" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 59,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 54,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(AnimatedSphere, { position: [-2, 0, 0], color: "#ff6b6b" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatedSphere, { position: [2, 0, 0], color: "#4ecdc4" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatedSphere, { position: [0, 0, -2], color: "#45b7d1" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      Text,
      {
        position: [0, 3, 0],
        fontSize: 0.5,
        color: "#ffffff",
        anchorX: "center",
        anchorY: "middle",
        children: "AI World Simulator"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 68,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(OrbitControls, { enablePan: true, enableZoom: true, enableRotate: true }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 78,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
function AssetUploader({ projectId, onAssetUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const handleFileUpload = async (files) => {
    setUploading(true);
    try {
      for (let file of files) {
        const url = await websim.upload(file);
        const asset = await room.collection("assets").create({
          project_id: projectId,
          name: file.name,
          type: file.type.startsWith("image/") ? "texture" : file.name.endsWith(".glb") || file.name.endsWith(".gltf") ? "model" : file.type.startsWith("audio/") ? "audio" : "other",
          url,
          size: file.size
        });
        onAssetUploaded && onAssetUploaded(asset);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: `border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive ? "border-blue-400 bg-blue-50/10" : "border-gray-600 hover:border-gray-500"}`,
      onDragEnter: () => setDragActive(true),
      onDragLeave: () => setDragActive(false),
      onDragOver: (e) => e.preventDefault(),
      onDrop: handleDrop,
      children: [
        /* @__PURE__ */ jsxDEV(Upload, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 133,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-lg font-medium text-white mb-2", children: uploading ? "Uploading..." : "Drop your assets here" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 mb-4", children: "Support for 3D models (.glb, .gltf), textures, audio files" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 137,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "file",
            multiple: true,
            className: "hidden",
            id: "file-upload",
            onChange: handleChange,
            accept: ".glb,.gltf,.jpg,.jpeg,.png,.mp3,.wav,.ogg"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 140,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "label",
          {
            htmlFor: "file-upload",
            className: "cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors",
            children: "Choose Files"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 148,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 124,
      columnNumber: 5
    },
    this
  );
}
function PromptInterface({ projectId, onPromptSubmit }) {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isProcessing) return;
    setIsProcessing(true);
    const userMessage = { role: "user", content: prompt };
    const newHistory = [...conversationHistory, userMessage];
    setConversationHistory(newHistory);
    try {
      await room.collection("interactions").create({
        project_id: projectId,
        prompt,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const completion = await websim.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an AI world simulator assistant. Help users create and modify 3D environments based on their descriptions. Be creative and provide specific suggestions for scene elements, lighting, and interactions."
          },
          ...newHistory.slice(-5)
          // Keep last 5 messages for context
        ]
      });
      const assistantMessage = { role: "assistant", content: completion.content };
      setConversationHistory([...newHistory, assistantMessage]);
      onPromptSubmit && onPromptSubmit(prompt, completion.content);
    } catch (error) {
      console.error("Error processing prompt:", error);
    } finally {
      setIsProcessing(false);
      setPrompt("");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/50 rounded-lg p-4 max-h-64 overflow-y-auto", children: conversationHistory.length === 0 ? /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 text-center", children: "Describe your world or ask for interactions..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 208,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: conversationHistory.map((message, index) => /* @__PURE__ */ jsxDEV("div", { className: `${message.role === "user" ? "text-blue-300" : "text-green-300"}`, children: [
      /* @__PURE__ */ jsxDEV("strong", { children: message.role === "user" ? "You: " : "AI: " }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 215,
        columnNumber: 17
      }, this),
      message.content
    ] }, index, true, {
      fileName: "<stdin>",
      lineNumber: 214,
      columnNumber: 15
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 212,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 206,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: prompt,
          onChange: (e) => setPrompt(e.target.value),
          placeholder: "Describe your world: 'Add a medieval castle on the hill' or 'Make the character walk to the fountain'",
          className: "flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none",
          disabled: isProcessing
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 224,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: isProcessing || !prompt.trim(),
          className: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2",
          children: [
            isProcessing ? /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 animate-spin" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 237,
              columnNumber: 27
            }, this) : /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 237,
              columnNumber: 75
            }, this),
            isProcessing ? "Processing..." : "Generate"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 232,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 223,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 205,
    columnNumber: 5
  }, this);
}
function Leaderboard() {
  const { data: leaderboardData, loading } = useQuery(
    room.query(`
      SELECT 
        u.id,
        u.username,
        COUNT(DISTINCT p.id) as project_count,
        COUNT(DISTINCT a.id) as asset_count,
        COUNT(DISTINCT i.id) as interaction_count
      FROM public.user u
      LEFT JOIN public.projects p ON u.id = p.user_id
      LEFT JOIN public.assets a ON u.id = a.user_id
      LEFT JOIN public.interactions i ON u.id = i.user_id
      GROUP BY u.id, u.username
      ORDER BY (COUNT(DISTINCT p.id) * 10 + COUNT(DISTINCT a.id) * 2 + COUNT(DISTINCT i.id)) DESC
      LIMIT 10
    `)
  );
  if (loading) return /* @__PURE__ */ jsxDEV("div", { className: "text-center text-gray-400", children: "Loading leaderboard..." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 265,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/50 rounded-lg p-6", children: [
    /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDEV(Trophy, { className: "w-5 h-5 text-yellow-500" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 270,
        columnNumber: 9
      }, this),
      "Top Creators"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 269,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: leaderboardData?.map((user, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? "bg-yellow-500 text-black" : index === 1 ? "bg-gray-400 text-black" : index === 2 ? "bg-amber-600 text-white" : "bg-gray-600 text-white"}`, children: index + 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 276,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "img",
        {
          src: `https://images.websim.com/avatar/${user.username}`,
          alt: user.username,
          className: "w-8 h-8 rounded-full"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 284,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-white", children: user.username }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 290,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-gray-400", children: [
          user.project_count,
          " projects \u2022 ",
          user.asset_count,
          " assets \u2022 ",
          user.interaction_count,
          " interactions"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 291,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-lg font-bold text-blue-400", children: parseInt(user.project_count) * 10 + parseInt(user.asset_count) * 2 + parseInt(user.interaction_count) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 295,
        columnNumber: 13
      }, this)
    ] }, user.id, true, {
      fileName: "<stdin>",
      lineNumber: 275,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 273,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 268,
    columnNumber: 5
  }, this);
}
function ProjectManager({ selectedProject, onProjectSelect }) {
  const { data: projects, loading } = useQuery(room.collection("projects"));
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      const project = await room.collection("projects").create({
        name: newProjectName,
        description: "",
        scene_data: "{}",
        is_public: true
      });
      onProjectSelect(project);
      setNewProjectName("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white", children: "Your Projects" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 333,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setShowCreateForm(!showCreateForm),
          className: "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors",
          children: "New Project"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 334,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 332,
      columnNumber: 7
    }, this),
    showCreateForm && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreateProject, className: "bg-gray-800/50 rounded-lg p-4", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: newProjectName,
          onChange: (e) => setNewProjectName(e.target.value),
          placeholder: "Project name...",
          className: "w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400",
          autoFocus: true
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 344,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mt-3", children: [
        /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm", children: "Create" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: () => setShowCreateForm(false),
            className: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded text-sm",
            children: "Cancel"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 356,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 352,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 343,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: loading ? /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400", children: "Loading projects..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 369,
      columnNumber: 11
    }, this) : projects?.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400 text-center py-4", children: "No projects yet. Create your first world!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 371,
      columnNumber: 11
    }, this) : projects?.map((project) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        onClick: () => onProjectSelect(project),
        className: `p-3 rounded-lg cursor-pointer transition-colors ${selectedProject?.id === project.id ? "bg-blue-600 text-white" : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"}`,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-medium", children: project.name }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 383,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm opacity-75", children: [
            "Created ",
            new Date(project.created_at).toLocaleDateString()
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 384,
            columnNumber: 15
          }, this)
        ]
      },
      project.id,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 374,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 367,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 331,
    columnNumber: 5
  }, this);
}
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("scene");
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: assets } = useQuery(
    selectedProject ? room.collection("assets").filter({ project_id: selectedProject.id }) : null
  );
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await window.websim.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    loadUser();
  }, []);
  const handleAssetUploaded = (asset) => {
    console.log("Asset uploaded:", asset);
  };
  const handlePromptSubmit = (prompt, response) => {
    console.log("Prompt processed:", prompt, response);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "bg-black/20 backdrop-blur-sm border-b border-gray-800", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(Globe, { className: "w-8 h-8 text-blue-400" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 435,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "AI World Simulator" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 436,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 434,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: currentUser && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            src: `https://images.websim.com/avatar/${currentUser.username}`,
            alt: currentUser.username,
            className: "w-8 h-8 rounded-full"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 441,
            columnNumber: 19
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("span", { className: "text-white", children: currentUser.username }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 446,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 440,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 438,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 433,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 432,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 431,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxDEV(
          ProjectManager,
          {
            selectedProject,
            onProjectSelect: setSelectedProject
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 458,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(Leaderboard, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 462,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 457,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2", children: selectedProject ? /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-gray-700", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveTab("scene"),
              className: `px-6 py-3 font-medium transition-colors ${activeTab === "scene" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`,
              children: "3D Scene"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 471,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveTab("assets"),
              className: `px-6 py-3 font-medium transition-colors ${activeTab === "assets" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`,
              children: [
                "Assets (",
                assets?.length || 0,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 479,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveTab("prompt"),
              className: `px-6 py-3 font-medium transition-colors ${activeTab === "prompt" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`,
              children: "AI Chat"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 487,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 470,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
          activeTab === "scene" && /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-semibold text-white", children: selectedProject.name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 502,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setIsPlaying(!isPlaying),
                    className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
                    children: [
                      isPlaying ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 508,
                        columnNumber: 42
                      }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 508,
                        columnNumber: 74
                      }, this),
                      isPlaying ? "Pause" : "Play"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 504,
                    columnNumber: 27
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("button", { className: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors", children: /* @__PURE__ */ jsxDEV(Save, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 512,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 511,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 503,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 501,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "h-96 bg-black rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxDEV(Canvas, { children: /* @__PURE__ */ jsxDEV(Suspense, { fallback: null, children: /* @__PURE__ */ jsxDEV(Scene3D, { sceneData: selectedProject.scene_data, isPlaying }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 520,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 519,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 518,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 517,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 500,
            columnNumber: 21
          }, this),
          activeTab === "assets" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxDEV(
              AssetUploader,
              {
                projectId: selectedProject.id,
                onAssetUploaded: handleAssetUploaded
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 529,
                columnNumber: 23
              },
              this
            ),
            assets && assets.length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white mb-4", children: "Uploaded Assets" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 536,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: assets.map((asset) => /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/50 rounded-lg p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: `w-10 h-10 rounded-full flex items-center justify-center ${asset.type === "model" ? "bg-green-600" : asset.type === "texture" ? "bg-blue-600" : asset.type === "audio" ? "bg-purple-600" : "bg-gray-600"}`, children: /* @__PURE__ */ jsxDEV(Archive, { className: "w-5 h-5 text-white" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 546,
                  columnNumber: 37
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 541,
                  columnNumber: 35
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-white", children: asset.name }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 549,
                    columnNumber: 37
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-gray-400", children: asset.type }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 550,
                    columnNumber: 37
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 548,
                  columnNumber: 35
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 540,
                columnNumber: 33
              }, this) }, asset.id, false, {
                fileName: "<stdin>",
                lineNumber: 539,
                columnNumber: 31
              }, this)) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 537,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 535,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 528,
            columnNumber: 21
          }, this),
          activeTab === "prompt" && /* @__PURE__ */ jsxDEV(
            PromptInterface,
            {
              projectId: selectedProject.id,
              onPromptSubmit: handlePromptSubmit
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 562,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 498,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 468,
        columnNumber: 15
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg p-12 text-center", children: [
        /* @__PURE__ */ jsxDEV(Globe, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 571,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-white mb-2", children: "Welcome to AI World Simulator" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 572,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 mb-6", children: "Create immersive 3D worlds using natural language. Upload your assets and let AI bring your imagination to life." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 573,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left max-w-md mx-auto space-y-2 text-gray-300", children: [
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Upload 3D models, textures, and audio" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 577,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Describe environments in natural language" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 578,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Real-time 3D rendering at 24fps" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 579,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 AI-powered character interactions" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 580,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Persistent world state and memory" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 581,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 576,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 570,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 466,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white mb-4", children: "Quick Actions" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 590,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 593,
              columnNumber: 19
            }, this),
            "Generate World"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 592,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Upload, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 597,
              columnNumber: 19
            }, this),
            "Upload Assets"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 596,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Share2, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 601,
              columnNumber: 19
            }, this),
            "Share Project"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 600,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 591,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-white font-medium mb-3", children: "Platform Stats" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 607,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-gray-300", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "Active Worlds:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 610,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-green-400", children: "1,247" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 611,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 609,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-gray-300", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "Total Assets:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 614,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-blue-400", children: "15,693" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 615,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 613,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-gray-300", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "AI Interactions:" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 618,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400", children: "892,456" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 619,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 617,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 608,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 606,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 589,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 588,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 455,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 454,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 429,
    columnNumber: 5
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 632,
  columnNumber: 13
}));
