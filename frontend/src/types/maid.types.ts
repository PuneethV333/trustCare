import z from "zod";

export const jobSchema = z.object({
    id:z.string(),
    startDate: z.string(),
    active: z.boolean(),
    user: z.object({
        name: z.string(),
    }),
    plan: z.object({
        cost: z.number(),
        type: z.enum(["monthly", "hourly", "yearly"])
    })
})

export type job = z.infer<typeof jobSchema>