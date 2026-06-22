import { Router } from "express";
import { getTop4Maids } from "../controller/maid.controller";

export const maidRoute = Router()

maidRoute.get("/get/top", getTop4Maids)