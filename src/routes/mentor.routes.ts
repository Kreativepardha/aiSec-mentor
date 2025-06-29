import { Router, type RequestHandler } from "express";
import { mentorChatController } from "../controllers/mentor.controller";

const router = Router();

router.post("/chat", mentorChatController as RequestHandler);

export default router;
