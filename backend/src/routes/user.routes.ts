import { Router } from "express";
import { addRequest, getMyRequests, getUser, updateMe } from "../controller/user.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

export const userRoute = Router()

userRoute.get("/get/:id", getUser)
userRoute.post("/add/request/:id", authMiddleWare, addRequest)
userRoute.get("/my/request", authMiddleWare, getMyRequests)
userRoute.post("/update/me", authMiddleWare, updateMe)