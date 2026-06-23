import z from "zod";

export const signUpSchema = z.object({
    name: z.string(),
    email: z.email(),
    phoneNumber: z.string().optional(),
    profilePic: z.url().optional()
})

export type signUpType = z.infer<typeof signUpSchema>

export const plan = z.object({
    cost: z.number(),
    type: z.enum(["monthly", "yearly", "hourly"]),
    dailyWorkingHours: z.number(),
    duration: z.number(),
})

export const createMaidSchema = z.object({
    type: z.enum(["nanny", "maid", "babysitter"]),
    bio: z.string().optional(),
    experience: z.number(),
    city: z.string().optional(),
    area: z.string().optional(),
    costPerHour: z.string(),
    plans: z.array(plan),
    skill:z.array(z.string())
})

export type createMaid = z.infer<typeof createMaidSchema>