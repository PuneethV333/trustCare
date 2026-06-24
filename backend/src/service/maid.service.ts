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
    
    if (cached){
        return {
            data:JSON.parse(cached),
            source:"redis"
        }
    }
    
    
    const maids = await prisma.maidProfile.findMany({
        include:{
            user:true,
        }
    })
    
    await setValKey(cacheKey,JSON.stringify(maids))
    return {
        data:maids,
        source:"db"
    }
}