import type { Request, Response } from "express";
import { analyzeWithAgent } from "../agents/mentorAgent";
import logger from "../utils/logger";



export const mentorChatController = async (req: Request, res: Response) => {
  try {
    const { query } = req.body
    if (!query) return res.status(400).json({ error: 'Query is required.' })

    const reply = await analyzeWithAgent(query)
    res.json({ reply })
  } catch (e) {
    res.status(500).json({ error: 'Unexpected error.' })
  }
}