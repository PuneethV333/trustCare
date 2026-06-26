import { prisma } from "../config/prisma";
import { addRequest } from "../types/maid.types";

export const getUserService = async (id: string) => {
    const user =  await prisma.user.findUnique({
        where: { id },
        include: {
            maidProfile: {
                include: {
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    profilePic: true,
                                    id: true
                                }
                            }
                        }
                    },
                    plans: true
                }
            }
        },
    });
    return user
    
};

export const addRequestService = async (firebaseUid: string, maidId: string, payload: addRequest) => {
    const user = await prisma.user.findUnique({
        where: { firebaseUid }
    })

    if (!user) {
        throw new Error("User not found")
    }

    const maid = await prisma.user.findUnique({
        where: { id: maidId }
    })

    if (!maid || maid.role !== 'HELPER') {
        throw new Error("maid not found")
    }

    const res = await prisma.request.create({
        data: {
            planId: payload.planId,
            startDate: payload.startData,
            userId: user.id
        }
    })

    return res
}