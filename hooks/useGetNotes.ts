import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

import type { Note } from "@prisma/client"

export const useGetNotes = () => {
    const session = useSession()

    const noteQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            if(session.data?.user.uid === undefined) return null
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/note/${session.data?.user.uid}`)
            const data: readonly Note[] = await res.json()
            return [...data].sort((a, b) => a.orderIndex - b.orderIndex)
        }
    })

    useEffect(() => {
        noteQuery.refetch({ queryKey: ['notes'] }).catch(err => console.log(err))
    }, [session.status])

    return noteQuery
}