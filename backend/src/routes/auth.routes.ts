import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { completeOnBoardingForMaids, getMe, joinAsHelper, signUp } from "../controller/auth.controller";

export const authRouter = Router()

authRouter.get("/getMe", authMiddleWare, getMe)
authRouter.post("/signUp", authMiddleWare, signUp)
authRouter.post("/helper/signUp", authMiddleWare, joinAsHelper)
authRouter.post("/onboarding", authMiddleWare, completeOnBoardingForMaids)