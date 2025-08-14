import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Je bent de virtuele assistent van [Bedrijfsnaam], help bezoekers vriendelijk en professioneel."
        },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Er is iets misgegaan" });
  }
}
