import z from "zod";

export const getTop4MaidsReqBody = z.object({
    lat: z.string(),
    lng: z.string()
})

export const addRequestschema = z.object({
    startData:z.coerce.date(),
    planId:z.string()
})

export type addRequest = z.infer<typeof addRequestschema>