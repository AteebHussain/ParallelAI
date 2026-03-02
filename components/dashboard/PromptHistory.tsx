"use client";

import { Clock, MessageSquare, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ResponseData = {
  text?: string;
  error?: string;
  latency?: number;
  tokens?: number;
};

export type HistoryEntry = {
  id: string;
  prompt: string;
  responses: Record<string, ResponseData>;
  models: string[];
  timestamp: Date;
};

type Props = {
  history: HistoryEntry[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
};

export default function PromptHistory({
  history,
  isOpen,
  onToggle,
  onSelect,
  onClear,
}: Props) {
  return (
    <>
      {/* Toggle Button — always visible */}
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-white/5 border border-white/10 border-l-0 rounded-r-xl p-2 text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
        title={isOpen ? "Close history" : "Open history"}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-[#0c0c14]/95 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <h2 className="text-white font-semibold text-sm">
                  Prompt History
                </h2>
                <span className="text-white/30 text-xs">
                  ({history.length})
                </span>
              </div>
              {history.length > 0 && (
                <button
                  onClick={onClear}
                  className="text-white/30 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-white/5"
                  title="Clear history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {history.length === 0 ? (
                <div className="text-center py-12 text-white/20 text-sm">
                  <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-30" />
                  <p>No prompts yet.</p>
                  <p className="text-xs mt-1">
                    Your comparisons will appear here.
                  </p>
                </div>
              ) : (
                history.map((entry, index) => (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onSelect(entry)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-200 group"
                  >
                    <p className="text-white/70 text-sm line-clamp-2 group-hover:text-white/90 transition-colors">
                      {entry.prompt}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-white/20 text-xs">
                        <Clock className="w-3 h-3" />
                        {formatTime(entry.timestamp)}
                      </span>
                      <span className="text-white/20 text-xs">
                        {entry.models.length} model
                        {entry.models.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}

function formatTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
