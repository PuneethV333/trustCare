import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import { acceptRequestService, getMaidsService, getMyRequestService, getTop4MaidsService, rejectRequestService } from "../service/maid.service";

export const getTop4Maids = async (_: Request, res: Response) => {
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

export const getMaids = async (_: Request, res: Response) => {
    try {
        const result = await getMaidsService()
        return res.status(200).json({
            data: result.data,
            source: result.source
        })
    } catch (err) {
        return res.status(500).json(getError(err))
    }
}

export const getMyRequests = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid

        const result = await getMyRequestService(firebaseUid)

        return res.status(200).json({
            data: result
        })

    } catch (err) {
        return res.status(500).json(getError(err))
    }
}

export const acceptRequest = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid
        const requestId = req.params.id

        if (!requestId) {
            return res.status(400).json({
                message: "plan id not provided"
            })
        }

        const result = await acceptRequestService(firebaseUid, Array.isArray(requestId) ? requestId[0] : requestId)
        
        
        return res.status(200).json({
            data:result
        })
    } catch (err) {
        return res.status(500).json(getError(err))
    }
}

export const rejectRequest = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid
        const requestId = req.params.id

        if (!requestId) {
            return res.status(400).json({
                message: "plan id not provided"
            })
        }

        const result = await rejectRequestService(firebaseUid, Array.isArray(requestId) ? requestId[0] : requestId)
        
        
        return res.status(200).json({
            data:result
        })
    } catch (err) {
        return res.status(500).json(getError(err))
    }
}