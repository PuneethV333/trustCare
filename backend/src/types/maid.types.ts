import z from "zod";

export const getTop4MaidsReqBody = z.object({
    lat: z.string(),
    lng: z.string()
})

