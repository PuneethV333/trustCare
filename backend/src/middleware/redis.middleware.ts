import { NextFunction, Request, Response } from "express";

export const redisMiddleWare = async (_: Request, res: Response, next: NextFunction) => {
    res.set("Cache-Control", "no-Store")
    next()
}