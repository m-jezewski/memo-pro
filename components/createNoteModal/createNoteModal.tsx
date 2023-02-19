import { Modal } from "../modal/modal";
import { NoteForm } from "../noteForm/noteForm";

import type { Dispatch, SetStateAction } from "react";

import { useCreateNote } from "@/hooks/useCreateNote";

interface CreateNoteModalProps {
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateNoteModal = ({ isOpen, setIsOpen }: CreateNoteModalProps) => {
    const createNoteMutation = useCreateNote(() => { setIsOpen(false) })

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

