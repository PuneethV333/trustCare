import { Request, Response } from "express";
import { getMeService, signUpService } from "../service/auth.service";
import { getError } from "../utils/error.utils";
import { signUpSchema } from "../types/auth.types";

export const getMe = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid;

        const result = await getMeService(firebaseUid);

        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: result.data,
        });
    } catch (err) {
        return res.status(500).json(getError(err));
    }
};

export const signUp = async (req: Request, res: Response) => {
    try {
        const firebaseUid = req.user!.firebaseUid
        const parsed = signUpSchema.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid request body",
                error: parsed.error
            })
        }

        const result = await signUpService(firebaseUid, parsed.data)

        if (result.data === null) {
            return res.status(400).json({
                success: false,
                message: "failed to create new User",
                data: null
            })
        }

        return res.status(result.createdAccount ? 201 : 200).json({
            success: true,
            message: result.createdAccount
                ? "Account created successfully"
                : "User already exists",
            data: result.data
        })

    } catch (err) {
        return res.status(500).json(getError(err))
    }
};

