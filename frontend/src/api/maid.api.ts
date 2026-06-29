import z from "zod";
import { api } from "../config/api.config"
import { IMaid, Maid, requests, requestType } from "../types/user.types";
import { job, jobSchema } from "../types/maid.types";

export const getTopMaidsApi = async (): Promise<Maid[]> => {
    const res = await api.get("/api/maid/get/top")
    return z.array(IMaid).parse(res.data.data)
}

export const getMaidsApi = async (): Promise<Maid[]> => {
    const res = await api.get("/api/maid/get")
    return z.array(IMaid).parse(res.data.data)
}

export const acceptRequestApi = async (id: string): Promise<requestType> => {
    const res = await api.post(`/api/maid/request/accept/${id}`)
    return requests.parse(res.data.data)
}

export const rejectRequestApi = async (id: string): Promise<requestType> => {
    const res = await api.post(`/api/maid/request/reject/${id}`)
    return requests.parse(res.data.data)
}


export const getMyRequestsApi = async (): Promise<requestType[]> => {
    const res = await api.get("/api/maid/my/request")
    return z.array(requests).parse(res.data.data)
}

export const getMyJobsApi = async (): Promise<job[]> => {
    const res = await api.get("/api/maid/get/jobs")
    return z.array(jobSchema).parse(res.data.data)
}