import Head from 'next/head';

import { Header } from '@/components/header/header';
import { NotesMainSection } from '@/components/notesMainSection/notesMainSection';

const Notes = () => {
  return (
    <>
      <Head>
        <title>MemoPro - Your Notes</title>
      </Head>
      <div className="container flex flex-col mx-auto min-h-screen text-white_1">
        <Header />
        <NotesMainSection />
      </div>
    </>
  );
};

export default Notes;
