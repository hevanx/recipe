# AI Recipe Maker

A React web app that generates recipes from ingredients you already have, powered by a locally-running LLM via Ollama.

## What it does

Enter whatever ingredients are in your fridge or pantry, optionally pick a cuisine style and a dietary restriction, and the app generates a complete recipe — dish name, description, ingredient list, and step-by-step instructions — in real time using streaming responses.

## API / Service used

- **[Ollama](https://ollama.com/)** — runs an LLM locally on your machine (no API key, no account, no cost)
- Model: `llama3.2:latest`
- Endpoint: `POST http://localhost:11434/api/generate` with `"stream": true`

## How to run it

### Prerequisites

1. Install [Ollama](https://ollama.com/) and pull the model:
   ```bash
   ollama pull llama3.2:latest
   ```
2. Start Ollama (it runs as a background service after install — confirm with `ollama list`)

### Start the app

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Ollama must be running in the background for recipe generation to work.

## Tech stack

- React (Vite)
- Ollama streaming API (`/api/generate`)
- Plain CSS (no UI library)
