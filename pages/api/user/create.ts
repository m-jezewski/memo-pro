import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
    if(req.method === 'POST'){
        console.log(req.body)
        const user = await client.user.create({data: {...req.body}})
        res.json(user)
    } else{
        throw new Error("Wrong HTTP method")
    }
}