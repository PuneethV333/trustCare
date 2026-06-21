import z from "zod";

export const IUser = z.object({
    role: z.enum(["USER", "HELPER", "ADMIN"]),
    id: z.string(),
    email: z.email(),
    name: z.string(),
    firebaseUid: z.string(),
    phoneNumber: z.string().optional(),
    profilePic: z.url().optional()
})

export type User = z.infer<typeof IUser>


export const ISignUpPayload = z.object({
    name:z.string(),
    email:z.email(),
    phoneNumber:z.string().optional(),
    profilePic:z.url().optional()
})

export type SignUpPayload = z.infer<typeof ISignUpPayload>