import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { getTop4MaidsService } from "../service/maid.service";

export const getTop4Maids = async (req: Request, res: Response) => {
    try {
        const result = await getTop4MaidsService()

        return res.status(200).json({
            data: result.data,
            source: result.source
        })

    } catch (err) {
        res.status(500).json(getError(err))
    }
}