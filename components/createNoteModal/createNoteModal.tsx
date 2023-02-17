import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Modal } from "../modal/modal";
import { NoteForm } from "../noteForm/noteForm";

import type { Dispatch, SetStateAction } from "react";

interface formValues {
    readonly title: string;
    readonly content: string;
}

interface CreateNoteModalProps {
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
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
            setIsOpen(false)
        },
    })

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title='New note'
            overlay={true}
        >
            <NoteForm
                initialValues={{ title: '', content: '' }}
                mutation={createNoteMutation}
                btnMessageIdle="Add new note"
                btnMessageSubmitting="Creating new note..."
            />
        </Modal>
    );
}

