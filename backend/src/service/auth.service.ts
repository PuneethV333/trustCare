import { prisma } from "../config/prisma"
import { signUpType } from "../types/auth.types"
import { getVal, setValKey } from "../utils/redis.utils"

export const getMeService = async (firebaseUid: string) => {
    const cacheKey = `user:${firebaseUid}`
    const cached = await getVal(cacheKey)
    if (cached) {
        return {
            data: JSON.parse(cached),
            success: true
        }
    }

    const user = await prisma.user.findUnique({
        where: { firebaseUid }
    })

    if (!user) {
        return {
            data: null,
            success: false
        }
    }

    await setValKey(cacheKey, JSON.stringify(user))
    return { data: user, success: true }
}

export const signUpService = async (firebaseUid: string, payload: signUpType) => {
    const cacheKey = `user:${firebaseUid}`
    const cached = await getVal(cacheKey)

    if (cached) {
        return {
            data: JSON.parse(cached),
            createdAccount: false
        }
    }

    const newUser = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            phoneNumber: payload.phoneNumber ?? "",
            firebaseUid,
            profilePic: payload.profilePic ?? ""
        }
    })

    if (!newUser) {
        return {
            data: null,
            createdAccount: false
        }
    }

    await setValKey(cacheKey, JSON.stringify(newUser))

    return {
        data: newUser,
        createdAccount: true
    }
}