import { useState } from 'react';

import { BlocksScreenAnimation } from '../homePageAnimation/blocksAnimation';
import { LoginForm } from '../loginForm/loginForm';
import { Modal } from '../modal/modal';
import { RegisterForm } from '../registerForm/registerForm';

interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
  const [isOpenRegForm, setOpenRegForm] = useState(false);
  const [isOpenLogForm, setOpenLogForm] = useState(false);

  return (
    <div className="min-h-screen flex">
      <main className="flex flex-col mx-auto px-8 mt-28 gap-2 font-montserrat container items-center lg:items-start text-white_1">
        <h1 className="font-bold text-5xl font-rowdies md:text-9xl">
          MEMO<span className="text-red_1">PRO</span>
        </h1>
        <h2 className="font-bold text-3xl max-w-3xl uppercase text-center lg:text-left md:text-5xl">
          Effortlessly jot down and keep track of your notes, ideas, and to-dos with MEMO
          <span className="text-red_1">PRO</span>
        </h2>
        <div className="flex flex-col gap-4 mt-5 md:flex-row">
          <button
            onClick={() => {
              setOpenRegForm(!isOpenRegForm);
            }}
            className="p-4 rounded-xl font-medium text-2xl bg-light_blue_1 w-60 duration-150 transition ease-in-out hover:bg-white_1 hover:text-red_1"
          >
            SIGN UP
          </button>
          <button
            onClick={() => {
              setOpenLogForm(!isOpenLogForm);
            }}
            className="p-4 rounded-xl font-medium text-2xl bg-light_blue_1 w-60 duration-150 transition ease-in-out hover:bg-white_1 hover:text-red_1"
          >
            LOG IN
          </button>
          <a className="p-4 text-center" href="https://github.com/m-jezewski/memo-pro">
            GitHub
          </a>
        </div>
        {isOpenRegForm && (
          <Modal isOpen={isOpenRegForm} setIsOpen={setOpenRegForm} title="REGISTER">
            <RegisterForm />
          </Modal>
        )}
        {isOpenLogForm && (
          <Modal isOpen={isOpenLogForm} setIsOpen={setOpenLogForm} title="LOGIN">
            <LoginForm />
          </Modal>
        )}
      </main>
      <BlocksScreenAnimation />
    </div>
  );
};
