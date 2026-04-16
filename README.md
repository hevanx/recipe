# AI Recipe Maker

A React web app that generates recipes from ingredients you already have, powered by a locally-running LLM via Ollama.

## What it does

Enter whatever ingredients are in your fridge or pantry, optionally pick a cuisine style (Italian, Mexican, Asian, etc.) and a dietary restriction (vegetarian, vegan, gluten-free, dairy-free), and the app generates a complete recipe in real time. The response streams token-by-token so you see the recipe appear as it's being written — dish name, description, ingredient list with quantities, and numbered step-by-step instructions.

## Option chosen

**Option A — AI-Powered Feature (LLM API)**

## API / Service used

- **[Ollama](https://ollama.com/)** — runs a large language model locally on your machine (no API key, no account, no cost)
- Model: `llama3.2:latest` (3.2B parameter model, runs on CPU/GPU locally)
- Endpoint: `POST http://localhost:11434/api/generate` with `"stream": true`
- The app reads the response as a `ReadableStream` and renders tokens as they arrive

## How to run it

### Prerequisites

1. Install [Ollama](https://ollama.com/)
2. Pull the model:
   ```bash
   ollama pull llama3.2:latest
   ```
3. Confirm Ollama is running:
   ```bash
   ollama list
   ```

### Start the app

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Ollama must be running in the background for recipe generation to work. If you see an error, make sure the Ollama app is open or run `ollama serve` in a terminal.

## Tech stack

- React + Vite
- Ollama streaming API (`/api/generate`)
- Plain CSS (no UI library)
