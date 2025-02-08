import type { NextApiRequest, NextApiResponse } from "next";

type ChatResponse = {
  response?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const apiUrl = "http://localhost:4891/v1/chat/completions"; // GPT4All local API

    const payload = {
      model: "gpt4all", // Change if using a specific model
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 200,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ response: data.choices?.[0]?.message?.content || "No response" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
