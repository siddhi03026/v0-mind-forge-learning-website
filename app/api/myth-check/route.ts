import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

export async function POST(req: Request) {
  try {

    const { statement } = await req.json()

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a scientific myth verification AI.

Return ONLY JSON in this format:

{
 "myth": "",
 "classification": "MYTH | FACT | PARTIALLY TRUE",
 "fact": "",
 "explanation": "",
 "confidence": 0.0
}
`
        },
        {
          role: "user",
          content: statement
        }
      ]
    })

    const text = completion.choices[0].message.content

    return new Response(text!, {
      headers: { "Content-Type": "application/json" }
    })

  } catch (error) {

    console.error("API ERROR:", error)

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    )

  }
}