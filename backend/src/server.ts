import app from "./app";
import { config } from "./config/data.config";
import { connectToDb } from "./config/db.config";
import { connectToRedis } from "./config/redis.config";

const PORT: number = Number(config.port)

const startServer = async () => {
    try {
        await connectToDb()
        await connectToRedis()
        app.listen(PORT, () => {
            console.log("server running on port:", PORT);

        })
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer()