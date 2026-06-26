import { Router } from "express";
import { addRequest, getUser } from "../controller/user.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

export const userRoute = Router()

userRoute.get("/get/:id", getUser)
userRoute.post("/add/request/:id", authMiddleWare, addRequest)