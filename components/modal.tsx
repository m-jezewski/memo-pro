import { useRef } from "react"

import type { Dispatch, SetStateAction, ReactNode } from "react";

interface ModalProps {
    readonly children: ReactNode
    readonly overlay?: boolean
    readonly isOpen: boolean
    readonly setIsOpen: Dispatch<SetStateAction<boolean>>
    readonly title?: string
}

export const Modal = ({ children, title, overlay = true, isOpen, setIsOpen }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    return (
        isOpen ?
            <div onClick={(e) => { e.target !== modalRef.current && setIsOpen(false) }}
                className={`fixed grid content-center justify-center inset-0 ${overlay ? 'bg-opacity-40 bg-black' : 'bg-transparent'} animate-fade-in`}>
                <div
                    onClick={(e) => { e.stopPropagation() }}
                    ref={modalRef}
                    className='relative bg-gradient-to-b from-dark_blue_1 to-slate-900 p-12 rounded-3xl flex flex-col gap-8 items-center text-white_1 shadow-2xl max-w-sm w-screen'>
                    <h2 className="mx-auto text-3xl font-medium">{title}</h2>
                    <button
                        className='absolute top-6 right-6 '
                        onClick={() => { setIsOpen(false) }}
                    >X</button>
                    {children}
                </div>
            </div>
            : <></>
    );
}
