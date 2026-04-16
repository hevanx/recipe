# Reflection

## What did you build and why?

I built an AI Recipe Maker — a React web app where you type in whatever ingredients you have on hand, optionally pick a cuisine style and dietary restriction, and the app generates a full recipe in real time. I chose Option A (LLM API) because it felt like the most practical feature to build: something that actually does something useful, not just a demo. I picked Ollama over a cloud API because it meant no account setup, no billing, and no API key to manage. I already had it installed, so the barrier to actually getting a response back was low.

## What surprised you?

A few things. First, how easy the actual API call was — Ollama exposes a simple HTTP endpoint and you just POST JSON to it. I expected something more complicated. What was harder than I expected was handling the streaming response. Ollama sends back newline-delimited JSON objects one at a time, and you have to read the `ReadableStream` chunk by chunk, split on newlines, and parse each line individually. A single chunk can contain a partial line or multiple lines at once, so I had to be careful not to just try parsing the whole chunk as one JSON object. That took more debugging than I expected.

The model itself also surprised me. `llama3.2` is only a 3.2B parameter model, but the recipe quality was genuinely good — correct ingredient proportions, sensible instructions, and it respected the dietary restrictions I passed in. I did have to be specific in the prompt. My first version just said "write a recipe" and got inconsistent formatting. Once I explicitly listed the sections I wanted (dish name, description, ingredient list with quantities, numbered steps), the output became much more consistent.

## What did you learn?

Running a model locally with Ollama felt surprisingly normal once it was set up. It's just a local server you POST to — no different from calling any other API, except the model is running on your own hardware. I learned how streaming responses work in practice: instead of waiting for the entire response and then displaying it, you can use `ReadableStream` and `getReader()` to read tokens as they arrive and update the UI in real time. That made the app feel much more responsive. I also learned that prompt engineering matters a lot more than I expected for structured output — small wording changes in the system prompt had a noticeable effect on how consistently the model formatted the recipe.

## What would you do differently?

If I had more time, I'd improve the recipe display. Right now it renders as plain text in a `<pre>` block. The model outputs markdown (bold headers, bullet points) but the app doesn't parse it, so the asterisks show up literally. I'd add a markdown renderer like `react-markdown` so the output looks polished. I'd also add a "save recipe" feature so you can keep the ones you liked — right now they disappear when you generate a new one. And I'd experiment with a larger model like `llama3.1:8b` to see if the quality difference is worth the slower generation speed.
