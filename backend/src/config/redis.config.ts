import { createClient } from "redis";
import { config } from "./data.config";

export const redisClient = createClient({
    url: config.redis_url
})


redisClient.on("error", (err) => {
    console.log("redis error", err.message);
})
redisClient.on("connect", () => {
    console.log("redis connected");
})
redisClient.on("ready", () => {
    console.log("Redis is ready to use");
})

export const connectToRedis = async () => {
    try {
        await redisClient.connect()
        console.log("connected to redis");
    } catch (err) {
        console.error(err);
        process.exit(1)
    }

}