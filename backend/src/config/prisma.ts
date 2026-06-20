import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "./data.config";
import { PrismaClient } from "@prisma/client/extension";


const adapter = new PrismaPg(config.db_url)
const prisma = new PrismaClient({adapter})

export {prisma}