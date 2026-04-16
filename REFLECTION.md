Reflection
What did you build and why?

I built an AI Recipe Maker. It’s a React web app where you throw in whatever ingredients you have, optionally pick a cuisine or dietary restriction, and it generates a full recipe instantly. I went with the LLM API option because it actually felt useful instead of just being a throwaway demo. I used Ollama instead of a cloud API mainly because it’s simple. No accounts, no API keys, no billing. I already had it set up, so I could just start building instead of dealing with setup friction.

What surprised you?

Honestly, the API part was way easier than I expected. Ollama is just a local HTTP endpoint. You send a POST request with JSON and it works. Nothing complicated. What wasn’t easy was handling the streaming response. It sends newline-delimited JSON, so you’re not getting one clean response. You have to read it chunk by chunk, split it up, and parse each line individually. Sometimes a chunk has half a line, sometimes multiple lines. If you try to parse the whole thing at once, it breaks. That part took way more debugging than I thought it would. The model quality also surprised me. llama3.2 is pretty small, but it still gave solid recipes. The ingredients made sense, the steps were usable, and it followed dietary restrictions pretty well. The bigger issue was formatting. When I kept the prompt vague, the output was inconsistent. Once I forced structure like naming sections and formatting expectations, it became way more reliable.

What did you learn?

Running a local model with Ollama feels pretty normal once it’s set up. It’s basically just another API, except it’s running on your machine. I also got a much better understanding of streaming responses. Instead of waiting for everything to load, you can read it as it comes in and update the UI live. That made the app feel a lot faster and more interactive. The biggest takeaway though is how much prompt wording matters. Small changes made a noticeable difference in how clean and structured the output was. If the prompt is vague, the output is messy. If you’re specific, the model actually does a pretty good job staying consistent.

What would you do differently?

The UI is definitely the weakest part right now. It just dumps everything into a <pre> block, so even though the model outputs markdown, it looks messy with all the asterisks showing. I’d fix that by actually rendering the markdown so it looks clean. I’d also add a way to save recipes. Right now if you generate a new one, the old one is just gone, which isn’t great.
