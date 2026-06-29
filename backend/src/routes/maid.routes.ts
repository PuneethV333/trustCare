import { Router } from "express";
import { acceptRequest, getMaids, getMyJobs, getMyRequests, getTop4Maids, rejectRequest } from "../controller/maid.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

export const maidRoute = Router()

maidRoute.get("/get/top", getTop4Maids)
maidRoute.get("/get/jobs", authMiddleWare, getMyJobs)
maidRoute.get("/get", getMaids)
maidRoute.get("/my/request", authMiddleWare, getMyRequests)
maidRoute.post("/request/accept/:id", authMiddleWare, acceptRequest)
maidRoute.post("/request/reject/:id", authMiddleWare, rejectRequest)