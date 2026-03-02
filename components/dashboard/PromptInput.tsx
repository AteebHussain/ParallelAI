"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MODELS } from "@/lib/models";
import { Loader2, Send, RotateCcw } from "lucide-react";

type Props = {
  onCompare: (prompt: string, selectedModels: string[]) => void;
  isLoading: boolean;
  onReset: () => void;
};

export default function PromptInput({ onCompare, isLoading, onReset }: Props) {
  const [prompt, setPrompt] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>(
    MODELS.map((m) => m.id),
  );

  const toggleModel = (id: string) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleSubmit = () => {
    if (!prompt.trim() || selectedModels.length === 0 || isLoading) return;
    onCompare(prompt, selectedModels);
  };

  const handleReset = () => {
    setPrompt("");
    setSelectedModels(MODELS.map((m) => m.id));
    onReset();
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      {/* Model Selector */}
      <div className="flex flex-wrap gap-2">
        {MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => toggleModel(model.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
              selectedModels.includes(model.id)
                ? `${model.bgColor} ${model.color} border-current`
                : "bg-white/5 text-white/30 border-white/10 hover:border-white/20"
            }`}
          >
            {model.name}
            <span className="ml-1.5 text-xs opacity-60">{model.provider}</span>
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything — compare how each model responds..."
        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 resize-none min-h-[120px] text-sm focus:ring-violet-500 focus:border-violet-500"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
        }}
      />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-white/20 text-xs">
          Press Ctrl+Enter to submit
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-white/40 hover:text-white/70 hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !prompt.trim() || selectedModels.length === 0 || isLoading
            }
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Compare
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
