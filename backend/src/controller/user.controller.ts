import { Request, Response } from "express";
import { getUserService } from "../service/user.service";
import { getError } from "../utils/error.utils";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getUserService(Array.isArray(id) ? id[0] : id);
        
        return res.status(200).json({
            data: user
        });
        
    } catch (err) {
        return res.status(500).json(getError(err));
    }
};