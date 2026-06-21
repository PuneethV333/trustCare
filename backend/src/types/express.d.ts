import "express-serve-static-core"

declare global {
    namespace Express {
        interface Request {
            user?: {
                firebaseUid: string,
                // role?: "Maid" | "User" | undefined
            }
        }
    }
}

export { }