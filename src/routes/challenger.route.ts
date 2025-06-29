import { Router } from 'express'
import { getAllChallenges } from '../controllers/challenge.controller'
const router = Router()

router.get('/', getAllChallenges)

export default router
