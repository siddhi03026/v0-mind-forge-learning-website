import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

export async function POST(req: Request) {

  const { topic } = await req.json()

  const completion = await client.chat.completions.create({

    model: "llama-3.1-8b-instant",

    response_format: { type: "json_object" },

    messages: [
      {
        role: "system",
        content: `
Generate exactly 10 MCQ questions.

Return JSON:

{
 "questions":[
  {
   "id":1,
   "question":"",
   "options":[
    {"id":"a","text":""},
    {"id":"b","text":""},
    {"id":"c","text":""},
    {"id":"d","text":""}
   ],
   "correctAnswer":"",
   "explanation":""
  }
 ]
}
`
      },
      {
        role: "user",
        content: `Create a quiz about ${topic}`
      }
    ]
  })

  return new Response(completion.choices[0].message.content!, {
    headers: { "Content-Type": "application/json" }
  })
}