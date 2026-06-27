import { Request, Response } from "express";
import { addRequestService, getMyRequestService, getUserService, updateMeService } from "../service/user.service";
import { getError } from "../utils/error.utils";
import { addRequestschema } from "../types/maid.types";
import { updateMeSchema } from "../types/user.types";

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

export const addRequest = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid

        const maidId = req.params.id

        if (!maidId) {
            return res.status(400).json({
                message: "maid id not provided"
            })
        }

        const parsed = addRequestschema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "invalid request body"
            })
        }

        const result = await addRequestService(firebaseUid, Array.isArray(maidId) ? maidId[0] : maidId, parsed.data)


        return res.status(200).json({
            data: result
        })

    } catch (err) {
        return res.status(500).json(getError(err))
    }
}

export const getMyRequests = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid

        const data = await getMyRequestService(firebaseUid)

        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json(getError(err))
    }
}

export const updateMe = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid

        const parsed = updateMeSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "invalid request body"
            })
        }

        const result = await updateMeService(firebaseUid, parsed.data)

        return res.status(200).json({
            data: result,
            success: true
        })
    } catch (err) {
        return res.status(500).json(getError(err))
    }
}