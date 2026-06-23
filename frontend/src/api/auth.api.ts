import { api } from "../config/api.config";
import { createMaid, IUser, SignUpPayload, User } from "../types/user.types";

export const getMeApi = async (): Promise<User> => {
    const res = await api.get("/api/auth/getMe")
    return IUser.parse(res.data.data)
}

export const signUpApi = async (payload: SignUpPayload): Promise<User> => {
    const res = await api.post("/api/auth/signUp", payload)
    return IUser.parse(res.data.data)
}

export const joinAsHelperApi = async (payload: SignUpPayload): Promise<User> => {
    const res = await api.post("/api/auth/helper/signUp", payload)
    return IUser.parse(res.data.data)
}

export const completeOnBoarding = async (payload: createMaid): Promise<User> => {
    const res = await api.post("/api/auth/onboarding", payload)
    return IUser.parse(res.data.data.user)
}