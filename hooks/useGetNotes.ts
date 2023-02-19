import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import type { Note } from "@prisma/client"

export const useGetNotes = () => {
    const session = useSession()

    const noteQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/note/${session.data?.user.uid}`)
            const data: readonly Note[] = await res.json()
            return data
        }
    })

    return noteQuery
}