import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import type { Note } from "@prisma/client"

export const useGetNotes = () => {
    const session = useSession()

    const noteQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/${session.data?.user.uid}`)
            const data: readonly Note[] = await res.json()
            return [...data].sort((a, b) => a.orderIndex - b.orderIndex)
        }
    })

    return noteQuery
}