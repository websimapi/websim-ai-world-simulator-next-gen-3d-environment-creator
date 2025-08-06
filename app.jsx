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
function SimpleScene() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.5 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [10, 10, 10], intensity: 1 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 30,
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
          lineNumber: 37,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(Sphere, { ref: meshRef, position: [0, 0, 0], args: [1, 32, 32], children: /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ff6b6b" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 40,
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
        lineNumber: 44,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(OrbitControls, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
function AssetUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        console.log("Uploading file:", file.name);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        if (onUpload) onUpload(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors", children: [
    /* @__PURE__ */ jsxDEV(Upload, { className: "mx-auto h-12 w-12 text-gray-400 mb-4" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-lg font-medium text-white mb-2", children: uploading ? "Uploading..." : "Upload Assets" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 85,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 mb-4", children: "3D models, textures, audio files" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "input",
      {
        type: "file",
        multiple: true,
        className: "hidden",
        id: "file-upload",
        onChange: handleFileChange,
        accept: ".glb,.gltf,.jpg,.jpeg,.png,.mp3,.wav",
        disabled: uploading
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      "label",
      {
        htmlFor: "file-upload",
        className: "cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors inline-block",
        children: "Choose Files"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 100,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}
function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [processing, setProcessing] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || processing) return;
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message.trim()
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: `I understand you want to ${message}. I'll help you create that in your 3D world.`
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/50 rounded-lg p-4 max-h-64 overflow-y-auto", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 text-center py-4", children: "Start by describing your world..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 152,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: messages.map((msg) => /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded ${msg.type === "user" ? "bg-blue-600/20 text-blue-200" : "bg-green-600/20 text-green-200"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-xs mb-1", children: msg.type === "user" ? "You" : "AI Assistant" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 161,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: String(msg.content) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 164,
          columnNumber: 17
        }, this)
      ] }, msg.id, true, {
        fileName: "<stdin>",
        lineNumber: 158,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      processing && /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-700/50 p-2 rounded animate-pulse", children: /* @__PURE__ */ jsxDEV("div", { className: "text-gray-400", children: "AI is thinking..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 171,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 170,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: message,
          onChange: (e) => setMessage(e.target.value),
          placeholder: "Describe your world: 'Add a castle on the hill'",
          className: "flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none",
          disabled: processing
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 177,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          disabled: processing || !message.trim(),
          className: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors",
          children: "Send"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 185,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 176,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 149,
    columnNumber: 5
  }, this);
}
function ProjectList({ selectedProject, onSelect }) {
  const [projects, setProjects] = useState([
    { id: "1", name: "My First World", created: "2024-01-15" },
    { id: "2", name: "Fantasy Realm", created: "2024-01-10" },
    { id: "3", name: "Sci-Fi Station", created: "2024-01-05" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newProject = {
      id: String(Date.now()),
      name: newName.trim(),
      created: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setProjects((prev) => [newProject, ...prev]);
    onSelect(newProject);
    setNewName("");
    setShowForm(false);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white", children: "Projects" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 226,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setShowForm(!showForm),
          className: "bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm",
          children: "New"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 227,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 225,
      columnNumber: 7
    }, this),
    showForm && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreate, className: "bg-gray-800/50 rounded-lg p-3", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: newName,
          onChange: (e) => setNewName(e.target.value),
          placeholder: "Project name...",
          className: "w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm",
          autoFocus: true
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 237,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm", children: "Create" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 246,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: () => setShowForm(false),
            className: "bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm",
            children: "Cancel"
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 249,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 245,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 236,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: projects.map((project) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        onClick: () => onSelect(project),
        className: `p-3 rounded-lg cursor-pointer transition-colors ${selectedProject?.id === project.id ? "bg-blue-600 text-white" : "bg-gray-800/50 hover:bg-gray-700/50 text-gray-200"}`,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-medium", children: String(project.name) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 271,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm opacity-75", children: [
            "Created ",
            String(project.created)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 272,
            columnNumber: 13
          }, this)
        ]
      },
      project.id,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 262,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 260,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 224,
    columnNumber: 5
  }, this);
}
function StatsPanel() {
  const stats = [
    { label: "Active Worlds", value: "1,247", color: "text-green-400" },
    { label: "Total Assets", value: "15,693", color: "text-blue-400" },
    { label: "AI Interactions", value: "892,456", color: "text-purple-400" }
  ];
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg p-6", children: [
    /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white mb-4", children: "Platform Stats" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 292,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: stats.map((stat, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-300", children: [
        String(stat.label),
        ":"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 296,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: stat.color, children: String(stat.value) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 297,
        columnNumber: 13
      }, this)
    ] }, index, true, {
      fileName: "<stdin>",
      lineNumber: 295,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 293,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 291,
    columnNumber: 5
  }, this);
}
function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("scene");
  const [isPlaying, setIsPlaying] = useState(false);
  const [assets, setAssets] = useState([]);
  const handleAssetUpload = (file) => {
    const newAsset = {
      id: String(Date.now()),
      name: file.name,
      type: file.type.includes("image") ? "texture" : "model",
      size: file.size
    };
    setAssets((prev) => [...prev, newAsset]);
  };
  const tabs = [
    { id: "scene", label: "3D Scene" },
    { id: "assets", label: `Assets (${assets.length})` },
    { id: "chat", label: "AI Chat" }
  ];
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900", children: [
    /* @__PURE__ */ jsxDEV("header", { className: "bg-black/20 backdrop-blur-sm border-b border-gray-800", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDEV(Globe, { className: "w-8 h-8 text-blue-400" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 334,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "AI World Simulator" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 335,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 333,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 332,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 331,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxDEV(
          ProjectList,
          {
            selectedProject,
            onSelect: setSelectedProject
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 344,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(StatsPanel, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 348,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 343,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2", children: selectedProject ? /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-gray-700", children: tabs.map((tab) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            className: `px-6 py-3 font-medium transition-colors ${activeTab === tab.id ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`,
            children: String(tab.label)
          },
          tab.id,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 358,
            columnNumber: 21
          },
          this
        )) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 356,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-6", children: [
          activeTab === "scene" && /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-semibold text-white", children: String(selectedProject.name) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 377,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setIsPlaying(!isPlaying),
                    className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2",
                    children: [
                      isPlaying ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 385,
                        columnNumber: 42
                      }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 385,
                        columnNumber: 74
                      }, this),
                      isPlaying ? "Pause" : "Play"
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 381,
                    columnNumber: 27
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("button", { className: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg", children: /* @__PURE__ */ jsxDEV(Save, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 389,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 388,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 380,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 376,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "h-96 bg-black rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxDEV(Canvas, { children: /* @__PURE__ */ jsxDEV(Suspense, { fallback: null, children: /* @__PURE__ */ jsxDEV(SimpleScene, {}, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 397,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 396,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 395,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 394,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 375,
            columnNumber: 21
          }, this),
          activeTab === "assets" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxDEV(AssetUploader, { onUpload: handleAssetUpload }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 406,
              columnNumber: 23
            }, this),
            assets.length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white mb-4", children: "Uploaded Assets" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 410,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid gap-3", children: assets.map((asset) => /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/50 rounded-lg p-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Archive, { className: "w-5 h-5 text-white" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 415,
                  columnNumber: 35
                }, this) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 414,
                  columnNumber: 33
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-white", children: String(asset.name) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 418,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-sm text-gray-400", children: String(asset.type) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 419,
                    columnNumber: 35
                  }, this)
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 417,
                  columnNumber: 33
                }, this)
              ] }, asset.id, true, {
                fileName: "<stdin>",
                lineNumber: 413,
                columnNumber: 31
              }, this)) }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 411,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 409,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 405,
            columnNumber: 21
          }, this),
          activeTab === "chat" && /* @__PURE__ */ jsxDEV(ChatInterface, {}, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 430,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 373,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 354,
        columnNumber: 15
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg p-12 text-center", children: [
        /* @__PURE__ */ jsxDEV(Globe, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 436,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl font-bold text-white mb-2", children: "Welcome to AI World Simulator" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 437,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-gray-400 mb-6", children: "Create immersive 3D worlds using natural language and your own assets." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 438,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-left max-w-md mx-auto space-y-2 text-gray-300", children: [
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Upload 3D models, textures, and audio" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 442,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Describe environments in natural language" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 443,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 Real-time 3D rendering at 24fps" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 444,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "\u2022 AI-powered interactions" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 445,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 441,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 435,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 352,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-800/30 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-semibold text-white mb-4", children: "Quick Actions" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 454,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 457,
              columnNumber: 19
            }, this),
            "Generate World"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 456,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Upload, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 461,
              columnNumber: 19
            }, this),
            "Upload Assets"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 460,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("button", { className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Share2, { className: "w-4 h-4" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 465,
              columnNumber: 19
            }, this),
            "Share Project"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 464,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 455,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 453,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 452,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 341,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 340,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 329,
    columnNumber: 5
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 478,
  columnNumber: 13
}));
