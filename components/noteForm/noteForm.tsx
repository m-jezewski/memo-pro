import { Form, Formik } from 'formik';

import { TextInput } from '../textInput/textInput';

import type { noteFormValues } from '@/interfaces';
import type { UseMutationResult } from '@tanstack/react-query';

interface NoteFormProps<TMutation> {
  readonly mutation: UseMutationResult<void, unknown, TMutation | noteFormValues, unknown>;
  readonly mutationOnSuccess: () => void;
  readonly initialValues: noteFormValues;
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
      onSubmit={(values, actions) => {
        mutation.mutate(values, {
          onSuccess: () => {
            mutationOnSuccess();
          },
        });
        actions.resetForm();
      }}
      validate={(values) => {
        if (!values.content) {
          return { content: 'Note content is required' };
        }
        return {};
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
          maxLength={10000}
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
