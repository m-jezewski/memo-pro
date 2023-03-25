import Head from 'next/head';

import { HomeButtonSection } from '@/components/homeButtonSection/homeButtonSection';
import { BlocksScreenAnimation } from '@/components/homePageAnimation/blocksAnimation';
import { useRedirect } from '@/hooks/useRedirect';

export default function Home() {
  useRedirect();

  return (
    <>
      <Head>
        <title>Memo Pro</title>
        <meta name="description" content="Keep track of your notes, ideas, and to-dos with MEMOPRO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="min-h-screen flex">
        <main className="flex flex-col mx-auto px-8 mt-28 gap-2 font-montserrat container items-center lg:items-start text-white_1">
          <h1 className="font-bold text-5xl font-rowdies md:text-9xl">
            MEMO<span className="text-red_1">PRO</span>
          </h1>
          <h2 className="font-bold text-3xl max-w-3xl uppercase text-center lg:text-left md:text-5xl">
            Effortlessly jot down and keep track of your notes, ideas, and to-dos with MEMO
            <span className="text-red_1">PRO</span>
          </h2>
          <HomeButtonSection />
          <p className="text-sm mt-4">
            <span className="my-1 block text-sm font-semibold">Demo account:</span>
            <span>
              login: test@test.com
              <br />
              password: test123
            </span>
          </p>
        </main>
        <BlocksScreenAnimation />
      </div>
    </>
  );
}
