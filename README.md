# ⚡ ParallelAI

Compare AI models side by side. Type a prompt, pick your models, and see responses from multiple LLMs with latency and token tracking.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Free%20Models-blue)

## Features

- 🤖 **4 free AI models** — Gemma 3, Nemotron, Step Flash, Trinity Mini (via OpenRouter)
- ⚡ **Side-by-side comparison** — See all responses in a responsive grid
- ⏱️ **Latency tracking** — See how fast each model responds
- 🔢 **Token usage** — Track token consumption per response
- 📋 **Copy to clipboard** — One-click copy on any response
- 📜 **Prompt history** — Revisit past comparisons from the sidebar
- 🌙 **Dark theme** — Sleek dark UI with glassmorphism effects

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/parallelai.git
cd parallelai
npm install
```

### 2. Set up API Key

Get a free API key from [OpenRouter](https://openrouter.ai/keys) (no credit card needed).

```bash
cp .env.example .env.local
# Then paste your key in .env.local
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | Your OpenRouter API key |

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI**: Tailwind CSS, shadcn/ui, Framer Motion
- **AI**: OpenRouter (unified gateway to free LLMs)
- **Language**: TypeScript

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add `OPENROUTER_API_KEY` as an environment variable
4. Deploy 🚀

## License

MIT
