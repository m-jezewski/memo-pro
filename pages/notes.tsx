import { signOut, useSession } from "next-auth/react";


interface NotesProps {

}

const Notes = ({ }: NotesProps) => {
    const session = useSession()


    return (
        <>
            <header className='flex text-white_1 gap-10'>
                <h1>MEMOPRO</h1>
                <button className=''>Create note</button>
                <button className='' onClick={async () => { await signOut({ callbackUrl: '/' }) }}>Logout</button>
                <h2>{session.status}</h2>
            </header>
            <main>

            </main>
        </>
    );
}

export default Notes
