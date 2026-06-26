import { api } from "../config/api.config"
import { addedRequest, addedRequestSchema, addRequest, getUser, IGetUser } from "../types/user.types";

export const getUserApi = async (id: string): Promise<getUser> => {
    const res = await api.get(`/api/user/get/${id}`)
    return IGetUser.parse(res.data.data)
}

export const addRequestApi = async (id: string, data: addRequest): Promise<addedRequest> => {
    const res = await api.post(`/api/user/add/request/${id}`, data)
    return addedRequestSchema.parse(res.data.data)
}