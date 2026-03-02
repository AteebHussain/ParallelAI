import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, models } = await req.json();

  if (!prompt || !models || models.length === 0) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const results = await Promise.allSettled(
    models.map((modelId: string) => callOpenRouter(modelId, prompt)),
  );

  const responses: Record<
    string,
    { text?: string; error?: string; latency: number; tokens: number }
  > = {};

  results.forEach((result, index) => {
    const modelId = models[index];
    if (result.status === "fulfilled") {
      responses[modelId] = result.value;
    } else {
      responses[modelId] = {
        error: result.reason?.message || "Failed",
        latency: 0,
        tokens: 0,
      };
    }
  });

  return NextResponse.json(responses);
}

async function callOpenRouter(
  modelId: string,
  prompt: string,
  retries = 2,
): Promise<{ text: string; latency: number; tokens: number }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in .env.local");
  }

  const start = Date.now();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://parallelai.vercel.app",
      "X-Title": "ParallelAI",
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    }),
  });

  const data = await res.json();

  // Check for errors (both HTTP-level and in-body)
  const error = !res.ok || data?.error;
  if (error) {
    const msg =
      data?.error?.message ||
      data?.error?.code ||
      `OpenRouter error (${res.status})`;
    const isRateLimit = res.status === 429 || data?.error?.code === 429;

    // Retry on rate limits
    if (isRateLimit && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return callOpenRouter(modelId, prompt, retries - 1);
    }

    throw new Error(msg);
  }

  const text = data.choices?.[0]?.message?.content || "";
  const tokens = data.usage?.total_tokens || 0;

  return {
    text,
    latency: Date.now() - start,
    tokens,
  };
}
