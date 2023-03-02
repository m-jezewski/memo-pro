/* eslint-disable functional/prefer-readonly-type   -- ja chce dzienki ok?*/

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
    } & DefaultSession['user'];
  }
}
