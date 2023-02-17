import Image from "next/image";
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
                    className='relative bg-gradient-to-b from-dark_blue_1 to-slate-900 p-10 rounded-3xl flex flex-col gap-8 items-center text-white_1 shadow-[0px_0px_60px_-5px_rgba(0,0,0,0.50)] max-w-sm w-screen'>
                    <h2 className="mx-auto text-2xl uppercase font-medium">{title}</h2>
                    <button
                        className='absolute top-11 right-10 '
                        onClick={() => { setIsOpen(false) }}
                    >
                        <Image src='/close.svg' alt='close modal' width={24} height={24} />
                    </button>
                    {children}
                </div>
            </div>
            : <></>
    );
}
