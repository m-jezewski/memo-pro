import { Prisma } from "@prisma/client";

import type { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
    if(req.method === 'POST'){
        try{
            const user = await client.user.create({data: {...req.body}})
            res.status(200).json(user)
        } catch (e) {
            if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') res.statusMessage = 'Sorry! User with this email already exisit'
            else res.statusMessage = 'Sorry! Something went wrong'
            res.status(500).end()
        }
    } else{
        throw new Error("Wrong HTTP method")
    }
}