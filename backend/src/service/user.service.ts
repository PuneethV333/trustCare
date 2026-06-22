import { prisma } from "../config/prisma";

export const getUserService = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      maidProfile: true,
    },
  });
};