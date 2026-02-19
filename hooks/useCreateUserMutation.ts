import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

import type { User } from '@prisma/client';

export const useCreateUserMutation = () => {
  return useMutation<User, Error, { readonly email: string; readonly password: string }>({
    mutationFn: async (values) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err: { message?: string } = await res.json();
        throw new Error(err.message || 'Something went wrong');
      }
      return res.json();
    },
    onSuccess(_data, variables) {
      void signIn('credentials', {
        redirect: false,
        email: variables.email,
        password: variables.password,
      });
    },
  });
}