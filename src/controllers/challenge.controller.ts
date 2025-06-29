import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllChallenges = async (_req: Request, res: Response) => {
  const challenges = await prisma.challenge.findMany()
  res.json(challenges)
}
