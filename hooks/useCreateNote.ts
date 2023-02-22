import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'


interface mutationValues {
    readonly title: string;
    readonly content: string;
    readonly uid?: string
}

export const useCreateNote = (onFinished?: () => void) => {
    const session = useSession()
    const queryClient = useQueryClient()

    const createNoteMutation = useMutation({
        mutationFn: async ({ title, content, uid }: mutationValues) => {
            const userId = session.data?.user.uid || uid
            await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_CALLBACK_URL}/api/note/create`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, content: content, uid: userId })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
            if(onFinished) onFinished()
        },
    })

    return createNoteMutation
}