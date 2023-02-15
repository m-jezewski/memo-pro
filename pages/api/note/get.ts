import { getSession } from "next-auth/react";

import type { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse<readonly Note[]>) {
    const session = await getSession()

    if(req.method === 'GET'){
        try{
            if(session?.user.uid) throw new Error()
            const notes = await client.note.findMany({ where: { authorId: session?.user.uid } })
            res.status(200).json(notes)
        } catch {
            res.statusMessage = 'Sorry!, Something went wrong while fetching your notes.'
            res.status(500).end()
        }
    } else{
        res.status(405).end()
    }
}