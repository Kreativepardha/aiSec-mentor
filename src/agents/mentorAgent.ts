// apps/api/agents/mentorAgent.ts
import OpenAI from 'openai'
import { detectCodeInText } from '../utils/detectCode'
import { runWithOllama } from './ollamaAgent'
import logger from '../utils/logger'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const analyzeWithAgent = async (input: string): Promise<string> => {
  const isCode = detectCodeInText(input)

  const prompt = isCode
    ? `You are a secure coding mentor. Review the following code and identify any security issues. 
Explain vulnerabilities clearly, suggest secure alternatives, and rate the security from 1–10.

Code:
${input}`
    : `You're a cybersecurity mentor. Explain the following question to a beginner:
    
"${input}"

Respond in clear, simple steps with examples.`

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert secure coding assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.4,
    })

    return res.choices[0].message?.content || 'No response'
  } catch (err: any) {
    logger.error('OpenAI Error:', err)

    // Handle token/quota errors (OpenAI returns 4xx, sometimes 421 in proxies)
    if (err?.status === 429 || err?.status === 401 || err?.status === 421) {
      logger.warn('Falling back to Ollama agent due to OpenAI quota/token error.')
      return await runWithOllama(prompt)
    }

    return 'Failed to process your request.'
  }
}
