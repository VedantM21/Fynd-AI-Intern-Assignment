import fetch from "node-fetch";

export async function analyzeReview(reviewText) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3001",
      "X-Title": "Fynd AI Intern Assignment"
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant analyzing customer reviews for a business.

RULES:
- Respond ONLY with valid JSON
- No markdown
- No extra text
- No explanations
`
        },
        {
          role: "user",
          content: `
Analyze the following customer review and return a JSON object with:

{
  "summary": "1–2 line concise summary of the review",
  "recommended_action": "what the business should do next",
  "confidence": number between 0 and 1 indicating confidence in analysis
}

Customer Review:
"${reviewText}"
`
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error: ${err}`);
  }

  const data = await response.json();

  // Hard parse – fail fast if model misbehaves
  return JSON.parse(data.choices[0].message.content);
}
