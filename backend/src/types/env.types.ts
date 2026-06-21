import z from "zod";

export const envType = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    FRONTEND_URL: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_CLIENT_EMAIL: z.string(),
    FIREBASE_PRIVATE_KEY: z.string(),
})