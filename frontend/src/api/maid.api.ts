import { array } from "zod";
import { api } from "../config/api.config"
import { IMaid, Maid } from "../types/user.types";

export const getTopMaidsApi = async (): Promise<Maid[]> => {
    const res = await api.get("/api/maid/get/top")
    return array(IMaid).parse(res.data.data)
}

export const getMaidsApi = async ():Promise<Maid[]> => {
    const res = await api.get("/api/maid/get")
    return array(IMaid).parse(res.data.data)
}