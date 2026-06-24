import { Router } from "express";
import { getMaids, getTop4Maids } from "../controller/maid.controller";

export const maidRoute = Router()

maidRoute.get("/get/top", getTop4Maids)
maidRoute.get("/get",getMaids)