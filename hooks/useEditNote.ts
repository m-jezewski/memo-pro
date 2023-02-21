import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEditNote = (
    noteId: string, 
    onFinished?: () => void,
    invalidate?: boolean
) => {
    const queryClient = useQueryClient()

    const editNoteMutation = useMutation({
        mutationFn: async (changesObj: any) => {
            await fetch('http://localhost:3000/api/note/edit', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...changesObj, id: noteId })
            })
        },
        onSuccess: async () => {
            if(invalidate) await queryClient.invalidateQueries({ queryKey: ['notes'] })
            if(onFinished) onFinished()
        }
    })

    return editNoteMutation
}