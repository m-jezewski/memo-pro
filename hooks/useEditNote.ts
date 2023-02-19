import { useMutation, useQueryClient } from '@tanstack/react-query'


export const useEditNote = (noteId: string, onFinished?: () => void) => {
    const queryClient = useQueryClient()

    const editNoteMutation = useMutation({
        mutationFn: async (formValues: { readonly title: string, readonly content: string }) => {
            await fetch('http://localhost:3000/api/note/edit', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: formValues.title, content: formValues.content, id: noteId })
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notes'] })
            if(onFinished) onFinished()
        }
    })

    return editNoteMutation
}