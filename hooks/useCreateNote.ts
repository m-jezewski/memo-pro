import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

interface formValues {
    readonly title: string;
    readonly content: string;
}

export const useCreateNote = (onFinished?: () => void) => {
    const session = useSession()
    const queryClient = useQueryClient()

    const createNoteMutation = useMutation({
        mutationFn: async ({ title, content }: formValues) => {
            await fetch('http://localhost:3000/api/note/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: title, content: content, uid: session.data?.user.uid })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
            if(onFinished) onFinished()
        },
    })

    return createNoteMutation
}