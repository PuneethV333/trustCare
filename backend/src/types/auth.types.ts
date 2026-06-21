import z from "zod";

export const signUpSchema = z.object({
    name:z.string(),
    email:z.email(),
    phoneNumber:z.string().optional(),
    profilePic:z.url().optional()
})

export type signUpType = z.infer<typeof signUpSchema>