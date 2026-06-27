import z from "zod";
import { api } from "../config/api.config"
import { addedRequest, addedRequestSchema, addRequest, getUser, IGetUser, IUser, requests, requestType, updateMeType, User } from "../types/user.types";

export const getUserApi = async (id: string): Promise<getUser> => {
    const res = await api.get(`/api/user/get/${id}`)
    return IGetUser.parse(res.data.data)
}

export const addRequestApi = async (id: string, data: addRequest): Promise<addedRequest> => {
    const res = await api.post(`/api/user/add/request/${id}`, data)
    return addedRequestSchema.parse(res.data.data)
}

export const getMyRequestsApi = async (): Promise<requestType[]> => {
    const res = await api.get("/api/user/my/request")
    return z.array(requests).parse(res.data.data)
}


export const updateMeApi = async (payload: updateMeType): Promise<User> => {
    const res = await api.post("/api/user/update/me", payload)
    return IUser.parse(res.data.data)
}