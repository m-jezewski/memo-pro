import type { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/prismadb";

interface reqBody {
    readonly uid: string,
    readonly noteId: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Note>) {
    const {noteId} : reqBody = req.body

    if(req.method === 'DELETE'){
        try{
            const note = await client.note.delete({where: { id: noteId }})
            res.status(200).json(note)
        } catch {
            res.statusMessage = 'Sorry!, Something went wrong while deleting your note.'
            res.status(500).end()
        }
    } else{
        res.status(405).end()
    }
}