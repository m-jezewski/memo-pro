import Image from "next/image";
import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom";

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

    useEffect(() => {
        if (typeof window === 'undefined') return

        const getKeyListener = (e: KeyboardEvent) => {
            const listener = keyListenerMap.get(e.code)
            if (listener) return listener(e)
        }
        modalRef.current?.focus()
        document.addEventListener("keydown", getKeyListener)
        return () => document.removeEventListener('keydown', getKeyListener)
    }, [])

    const handleTab = (e: KeyboardEvent) => {
        if (!modalRef.current) return
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>('button, textarea, input[type="text"]')
        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Element -> HTMLElement type assertion 
        const active = document.activeElement as HTMLElement | null

        if ((!e.shiftKey && active === last) || active === null || !Array.from(focusableElements).includes(active)) {
            first.focus()
            e.preventDefault()
        }

        if (e.shiftKey && active === first) {
            last.focus()
            e.preventDefault()
        }
    }

    const keyListenerMap = new Map([['Tab', handleTab], ['Escape', () => { setIsOpen(false) }]])

    const modalContent = isOpen ? (
        <div
            onMouseDown={() => { setIsOpen(false) }}
            role='dialog'
            aria-modal='true'
            className={`fixed grid content-center justify-center inset-0 ${overlay ? 'bg-opacity-40 bg-black' : 'bg-transparent'} animate-fade-in`}>
            <div
                onMouseDown={e => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                className='m-0 relative bg-gradient-to-b from-dark_blue_1 to-slate-900 p-10 sm:rounded-3xl flex 
                    flex-col gap-8 items-center text-white_1 shadow-[0px_0px_60px_-5px_rgba(0,0,0,0.50)] 
                    sm:max-w-sm md:max-w-md w-screen max-h-screen sm:m-8 custom-scrollbar overflow-y-auto overflow-x-hidden'
            >
                <h2 className="mx-10 text-2xl uppercase text-center font-medium break-words w-40 sm:w-56">{title}</h2>
                <button
                    className='absolute top-11 right-10 '
                    onClick={() => { setIsOpen(false) }}
                >
                    <Image src='/close.svg' alt='close modal' width={24} height={24} />
                </button>
                {children}
            </div>
        </div>
    ) : null

    if (typeof window !== 'undefined') {
        return createPortal(
            modalContent,
            document.getElementById("modal-root") || document.body
        );
    } else {
        return null
    }
}
