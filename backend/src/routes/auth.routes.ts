import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { getMe, signUp } from "../controller/auth.controller";

export const authRouter = Router()

authRouter.get("/getMe", authMiddleWare, getMe)
authRouter.post("/signUp", authMiddleWare, signUp)