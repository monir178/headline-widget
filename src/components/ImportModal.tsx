import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  FileText,
  Code,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useHeadlineStore } from "@/store/headline-store";
import {
  parseJSONImport,
  parseCSSImport,
  validateImportedSettings,
} from "@/utils/import-utils";
import toast from "react-hot-toast";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal = ({ isOpen, onClose }: ImportModalProps) => {
  const { updateSettings } = useHeadlineStore();
  const [activeTab, setActiveTab] = useState<"json" | "css">("json");
  const [jsonInput, setJsonInput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (activeTab === "json") {
        setJsonInput(content);
      } else {
        setCssInput(content);
      }
    };
    reader.readAsText(file);
  };

  const handleJSONImport = async () => {
    if (!jsonInput.trim()) {
      setError("Please enter JSON data to import.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = parseJSONImport(jsonInput);

      if (!result.success) {
        setError(result.error || "Failed to parse JSON");
        return;
      }

      const validation = validateImportedSettings(result.data!);
      if (!validation.success) {
        setError(validation.error || "Invalid settings data");
        return;
      }

      // Apply the imported settings
      updateSettings(validation.data!);

      toast.success("Settings imported successfully! 🎉", {
        style: {
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#10b981",
          backdropFilter: "blur(20px)",
        },
      });

      onClose();
      setJsonInput("");
    } catch (error) {
      setError("An unexpected error occurred while importing JSON.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCSSImport = async () => {
    if (!cssInput.trim()) {
      setError("Please enter CSS data to import.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = parseCSSImport(cssInput);

      if (!result.success) {
        setError(result.error || "Failed to parse CSS");
        return;
      }

      const validation = validateImportedSettings(result.data!);
      if (!validation.success) {
        setError(validation.error || "Invalid settings data");
        return;
      }

      // Apply the imported settings
      updateSettings(validation.data!);

      toast.success("CSS imported successfully! 🎨", {
        style: {
          background: "rgba(59, 130, 246, 0.15)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#3b82f6",
          backdropFilter: "blur(20px)",
        },
      });

      onClose();
      setCssInput("");
    } catch (error) {
      setError("An unexpected error occurred while importing CSS.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData("text");
    if (activeTab === "json") {
      setJsonInput(pastedText);
    } else {
      setCssInput(pastedText);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/20 rounded-3xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Upload className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white/90">
                      Import Settings
                    </h2>
                    <p className="text-sm text-white/60">
                      Import JSON or CSS to apply to your headline
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab("json")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === "json"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                        : "bg-white/5 text-white/70 hover:bg-white/10 border border-transparent"
                    }`}>
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">JSON</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("css")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === "css"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                        : "bg-white/5 text-white/70 hover:bg-white/10 border border-transparent"
                    }`}>
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-medium">CSS</span>
                  </button>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-400">{error}</span>
                  </motion.div>
                )}

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "json" ? (
                    <motion.div
                      key="json"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/80">
                          JSON Settings
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".json"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                          Upload File
                        </button>
                      </div>

                      <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        onPaste={handlePaste}
                        placeholder="Paste your JSON settings here or upload a file..."
                        className="w-full h-64 p-4 bg-black/20 border border-white/10 rounded-lg text-white/90 placeholder-white/50 resize-none focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={handleJSONImport}
                          disabled={isLoading || !jsonInput.trim()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-blue-400 border border-blue-400/30 rounded-lg transition-all duration-200">
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                            />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {isLoading ? "Importing..." : "Import JSON"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="css"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/80">CSS Styles</div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".css"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                          Upload File
                        </button>
                      </div>

                      <textarea
                        value={cssInput}
                        onChange={(e) => setCssInput(e.target.value)}
                        onPaste={handlePaste}
                        placeholder="Paste your CSS styles here or upload a file..."
                        className="w-full h-64 p-4 bg-black/20 border border-white/10 rounded-lg text-white/90 placeholder-white/50 resize-none focus:outline-none focus:border-blue-400/50 transition-colors font-mono text-sm"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={handleCSSImport}
                          disabled={isLoading || !cssInput.trim()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-blue-400 border border-blue-400/30 rounded-lg transition-all duration-200">
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
                            />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {isLoading ? "Importing..." : "Import CSS"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-xs text-white/60">
                    <strong>JSON Format:</strong> Import exported settings from
                    this widget or compatible JSON files.
                    <br />
                    <strong>CSS Format:</strong> Import CSS with
                    .headline-widget class styling.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
