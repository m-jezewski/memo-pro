import type { Note } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse<readonly Note[]>) {
    const updatedArr: readonly Note[] = req.body
    if(req.method === 'PUT'){
        try{
            const operations = updatedArr.map((note) => 
                client.note.update({
                    where: { id: note.id },
                    data: { orderIndex: note.orderIndex }
                })   
            )
            await client.$transaction(operations)
            res.status(200).end()
        } catch (error) {
            res.status(500).end()
        }
    } else{
        res.status(405).end()
    }
}