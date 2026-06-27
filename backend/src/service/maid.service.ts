import { prisma } from "../config/prisma"
import { getVal, setValKey } from "../utils/redis.utils"

export const getTop4MaidsService = async () => {
    const cacheKey = `top:maids`
    const cached = await getVal(cacheKey)

    if (cached) {
        return {
            data: JSON.parse(cached),
            source: "redis"
        }
    }

    const data = await prisma.maidProfile.findMany({
        where: {
            isVerified: true
        },
        orderBy: [
            { averageRating: "desc" },
            { totalReviews: "desc" },
        ],
        take: 4,
        include: {
            user: true
        }
    })

    await setValKey(cacheKey, JSON.stringify(data))

    return {
        data,
        source: "db"
    }
}

export const getMaidsService = async () => {
    const cacheKey = `maids:all`
    const cached = await getVal(cacheKey)

    if (cached) {
        return {
            data: JSON.parse(cached),
            source: "redis"
        }
    }


    const maids = await prisma.maidProfile.findMany({
        include: {
            user: true,
        }
    })

    await setValKey(cacheKey, JSON.stringify(maids))
    return {
        data: maids,
        source: "db"
    }
}

export const getMyRequestService = async (firebaseUid: string) => {
    const user = await prisma.user.findUnique({
        where: { firebaseUid },
        include: {
            maidProfile: true
        }
    })


    if (!user || user.role !== "HELPER") {
        throw new Error("User not found")
    }

    return await prisma.request.findMany({
        where: {
            plan: {
                maidProfileId: user.maidProfile?.id
            }
        },
        include: {
            plan: {
                include: {
                    maidProfile: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    profilePic: true,
                                },
                            },
                        },
                    },
                },
            },
        }
    })
}

export const acceptRequestService = async (
    firebaseUid: string,
    requestId: string
) => {
    return await prisma.$transaction(async (tx) => {
        const request = await tx.request.findUnique({
            where: { id: requestId },
            include: {
                plan: true,
            },
        });

        if (!request) {
            throw new Error("Request not found");
        }

        if (request.status !== "Pending") {
            throw new Error("Request already processed");
        }


        const helper = await tx.user.findFirst({
            where: {
                firebaseUid,
                role: "HELPER",
                maidProfile: {
                    plans: {
                        some: {
                            id: request.planId,
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        });

        if (!helper) {
            throw new Error("Unauthorized");
        }

        // Prevent duplicate active subscriptions
       

        // Create subscription
        const subscription = await tx.subscription.create({
            data: {
                userId: request.userId,
                planId: request.planId,
                active: true,
            },
        });

        // Increment subscriber count
        await tx.plans.update({
            where: {
                id: request.planId,
            },
            data: {
                noOfSubs: {
                    increment: 1,
                },
            },
        });

        // Accept request
        await tx.request.update({
            where: {
                id: requestId,
            },
            data: {
                status: "Accepted",
            },
        });

        return subscription;
    });
};

export const rejectRequestService = async (
    firebaseUid: string,
    requestId: string
) => {
    return await prisma.$transaction(async (tx) => {
        const request = await tx.request.findUnique({
            where: {
                id: requestId,
            },
        });

        if (!request) {
            throw new Error("Request not found");
        }

        if (request.status !== "Pending") {
            throw new Error("Request already processed");
        }

        const helper = await tx.user.findFirst({
            where: {
                firebaseUid,
                role: "HELPER",
                maidProfile: {
                    plans: {
                        some: {
                            id: request.planId,
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        });

        if (!helper) {
            throw new Error("Unauthorized");
        }

        return await tx.request.update({
            where: {
                id: requestId,
            },
            data: {
                status: "Rejected",
            },
        });
    });
};