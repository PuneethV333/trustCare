import { api } from "../config/api.config"
import { getUser, IGetUser } from "../types/user.types";

export const getUserApi = async (id: string): Promise<getUser> => {
    const res = await api.get(`/api/user/get/${id}`)
    return IGetUser.parse(res.data.data)
}