import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test(){
//     const token = await db.user.findUnique({
        
//     })
// }

export default db;