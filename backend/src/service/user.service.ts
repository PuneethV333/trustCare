import { prisma } from "../config/prisma";

export const getUserService = async (id: string) => {
    return await prisma.user.findUnique({
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
                    plans:true
                }
            }
        },
    });
};