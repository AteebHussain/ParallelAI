export type Model = {
  id: string;
  name: string;
  provider: string;
  color: string;
  bgColor: string;
};

export const MODELS: Model[] = [
  {
    id: "google/gemma-3-12b-it:free",
    name: "Gemma 3 12B",
    provider: "Google",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10 border-blue-400/20",
  },
  {
    id: "nvidia/nemotron-nano-12b-v2-vl:free",
    name: "Nemotron Nano 12B",
    provider: "NVIDIA",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "stepfun/step-3.5-flash:free",
    name: "Step 3.5 Flash",
    provider: "StepFun",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10 border-violet-400/20",
  },
  {
    id: "arcee-ai/trinity-mini:free",
    name: "Trinity Mini",
    provider: "Arcee AI",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10 border-orange-400/20",
  },
];
