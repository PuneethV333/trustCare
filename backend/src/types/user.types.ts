import z from "zod";

export const updateMeSchema = z.object({
    name:z.string(),
    profilePic:z.url(),
    email:z.email(),
    phoneNumber:z.string()
})

export type updateMeType = z.infer<typeof updateMeSchema>


