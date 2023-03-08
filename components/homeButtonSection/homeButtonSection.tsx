import { useState } from 'react';

import { LoginForm } from '../loginForm/loginForm';
import { Modal } from '../modal/modal';
import { RegisterForm } from '../registerForm/registerForm';

export const HomeButtonSection = () => {
  const [isOpenRegForm, setOpenRegForm] = useState(false);
  const [isOpenLogForm, setOpenLogForm] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-4 mt-5 md:flex-row">
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
      </section>
      <Modal isOpen={isOpenRegForm} setIsOpen={setOpenRegForm} title="REGISTER">
        <RegisterForm />
      </Modal>
      <Modal isOpen={isOpenLogForm} setIsOpen={setOpenLogForm} title="LOGIN">
        <LoginForm />
      </Modal>
    </>
  );
};
