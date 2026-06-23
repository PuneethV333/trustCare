import { prisma } from "../config/prisma"
import { createMaid, signUpType } from "../types/auth.types"
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
            profilePic: payload.profilePic ?? "https://ui-avatars.com/api/?name=User&background=random",
            role: "HELPER"
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

export const joinAsHelperService = async (firebaseUid: string, payload: signUpType) => {
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
            profilePic: payload.profilePic ?? "https://ui-avatars.com/api/?name=User&background=random",
            role: "HELPER"
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


export const completeOnBoardingForMaidsService = async (
    firebaseUid: string,
    payload: createMaid
) => {
    const user = await prisma.user.findUnique({
        where: {
            firebaseUid,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role !== "HELPER") {
        throw new Error("Only helpers can complete onboarding");
    }

    const existingProfile = await prisma.maidProfile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (existingProfile) {
        throw new Error("Onboarding already completed");
    }

    return await prisma.$transaction(async (tx) => {
        return tx.maidProfile.create({
            data: {
                userId: user.id,
                type: payload.type,
                skill: payload.skill,
                costPerHour: payload.costPerHour,
                bio: payload.bio,
                city: payload.city,
                area: payload.area,
                experience: payload.experience,

                plans: {
                    create: payload.plans.map((x) => ({
                        cost: x.cost,
                        type: x.type,
                        duration: x.duration,
                        dailyWorkingHours: x.dailyWorkingHours,
                        noOfSubs: 0,
                    })),
                },
            },
            include: {
                plans: true,
                user: true,
            },
        });
    });
};