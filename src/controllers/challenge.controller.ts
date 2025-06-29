import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient()

export const getAllChallenges = async (_req: Request, res: Response) => {
  const challenges = await prisma.challenge.findMany()
  res.json(challenges)
}
