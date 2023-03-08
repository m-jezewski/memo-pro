import { ErrorMessage, Field, useField } from 'formik';

import type { FieldHookConfig } from 'formik';
import type { ReactNode } from 'react';

interface TextInputOtherProps {
  readonly label: ReactNode;
}

export const TextInput = (props: TextInputOtherProps & FieldHookConfig<string>) => {
  const [field] = useField(props);
  return (
    <div className="relative">
      <label htmlFor={props.id || props.name} className="text-sm mb-1 inline-block">
        {props.label}
      </label>
      <ErrorMessage
        name={props.id || props.name}
        render={(message) => <p className="inline-block text-sm text-red_1 absolute right-0">{message}</p>}
      />
      <Field
        className="bg-dark_blue_1 custom-scrollbar resize-none w-full rounded-md p-2 outline-light_blue_1 "
        id={props.id || props.name}
        {...field}
        {...props}
      />
    </div>
  );
};
