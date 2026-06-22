import { Router } from "express";
import { getUser } from "../controller/user.controller";

export const userRoute = Router()

userRoute.get("/get/:id", getUser)