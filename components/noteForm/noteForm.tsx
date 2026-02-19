import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { TextInput } from '../textInput/textInput';

import { noteFormSchema } from '@/lib/validations/note';

import type { NoteFormValues } from '@/lib/validations/note';
import type { UseMutationResult } from '@tanstack/react-query';

interface NoteFormProps<TMutation> {
  readonly mutation: UseMutationResult<void, unknown, TMutation | NoteFormValues, unknown>;
  readonly mutationOnSuccess: () => void;
  readonly initialValues: NoteFormValues;
  readonly btnMessageSubmitting: string;
  readonly btnMessageIdle: string;
}

export const NoteForm = <TMutation,>({
  mutation,
  mutationOnSuccess,
  initialValues,
  btnMessageIdle,
  btnMessageSubmitting,
}: NoteFormProps<TMutation>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(noteFormSchema)}
      onSubmit={(values, actions) => {
        mutation.mutate(values, {
          onSuccess: () => {
            actions.resetForm();
            mutationOnSuccess();
          },
        });
      }}
    >
      <Form className="w-full flex flex-col gap-4">
        <TextInput
          label={
            <>
              Title <span className="text-light_blue_1">(optional)</span>
            </>
          }
          name="title"
          type="text"
          maxLength={40}
          placeholder="Note title"
        />
        <TextInput
          label={'Note content'}
          name="content"
          as="textarea"
          required
          rows={7}
          maxLength={75000}
          placeholder="Your note..."
        />
        {mutation.isError && <p className="text-red_1 text-center">Sorry!, Something went wrong!</p>}
        <button
          disabled={mutation.isLoading}
          className={`font-medium transition p-2 w-full rounded-full mt-4 leading-6 bg-light_blue_1 
          ${mutation.isLoading ? 'bg-dark_blue_1' : 'hover:bg-white_1 hover:text-red_1'}`}
          type="submit"
        >
          {mutation.isLoading ? btnMessageSubmitting : btnMessageIdle}
        </button>
      </Form>
    </Formik>
  );
};
