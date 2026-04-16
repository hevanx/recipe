import { useState } from 'react'
import './App.css'

const OLLAMA_URL = 'http://localhost:11434/api/generate'
const MODEL = 'llama3.2:latest'

function App() {
  const [ingredients, setIngredients] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dietary, setDietary] = useState('')
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buildPrompt = () => {
    let prompt = `You are a helpful chef. The user has these ingredients: ${ingredients}.`
    if (cuisine) prompt += ` They want a ${cuisine} style dish.`
    if (dietary) prompt += ` The recipe must be ${dietary}.`
    prompt += ` Write a complete recipe with: a dish name, a short description, an ingredient list with quantities, and numbered step-by-step instructions. Be concise and practical.`
    return prompt
  }

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient.')
      return
    }
    setError('')
    setRecipe('')
    setLoading(true)

    try {
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          prompt: buildPrompt(),
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama returned ${response.status}. Is it running?`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (!line.trim()) continue
          try {
            const json = JSON.parse(line)
            if (json.response) {
              fullText += json.response
              setRecipe(fullText)
            }
          } catch {
            // skip malformed lines
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Make sure Ollama is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) generateRecipe()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Recipe Maker</h1>
        <p className="subtitle">Tell me what you have — I'll tell you what to cook.</p>
      </header>

      <main className="app-main">
        <section className="input-card">
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients you have *</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. chicken, garlic, lemon, olive oil, rosemary..."
              rows={3}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="cuisine">Cuisine style</label>
              <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                <option value="">Any</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Asian">Asian</option>
                <option value="American">American</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Indian">Indian</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dietary">Dietary restriction</label>
              <select id="dietary" value={dietary} onChange={(e) => setDietary(e.target.value)}>
                <option value="">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="dairy-free">Dairy-free</option>
              </select>
            </div>
          </div>

          <button
            className="generate-btn"
            onClick={generateRecipe}
            disabled={loading}
          >
            {loading ? 'Generating…' : 'Generate Recipe'}
          </button>

          <p className="hint">Tip: Ctrl + Enter to generate</p>
        </section>

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {(loading || recipe) && (
          <section className="output-card">
            <div className="output-header">
              <h2>Your Recipe</h2>
              {!loading && (
                <button className="clear-btn" onClick={() => setRecipe('')}>
                  New Recipe
                </button>
              )}
            </div>

            {loading && !recipe && (
              <div className="skeleton">
                <div className="skeleton-line long" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line short" />
                <div className="skeleton-line long" />
                <div className="skeleton-line medium" />
              </div>
            )}

            {recipe && <pre className="recipe-text">{recipe}</pre>}
          </section>
        )}
      </main>
    </div>
  )
}

export default App
