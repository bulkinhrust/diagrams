import React, { createContext, FocusEventHandler, FormEventHandler, forwardRef, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';
import { Schema, ZodError } from 'zod';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';

type InitValue = Record<string, string | number | boolean | null | string[]>;

export type FormContextProps = PropsWithChildren<{
  className?: string;
  initValues: Record<string, any>;
  onSubmit(values: any | null, errors: Record<string, string> | null): void;
  validationSchema: Schema;
}>;
const FormContext = createContext<FormContextValue<any> | null>(null);

type FormContextValue<T = InitValue> = {
  errors: Record<string, string>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange<N extends keyof T>(fieldName: N, value: T[N]): void;
  onReset(): void;
  values: T;
}

const Form = forwardRef<HTMLFormElement, FormContextProps>((props, ref) => {
  const {
    children,
    className,
    initValues,
    onSubmit,
    validationSchema,
  } = props;

  type InitValue = typeof initValues;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<InitValue>(initValues);
  const touchedFields = useRef<Record<string, boolean>>({});

  const onValidate = async (callback?: (validationErrors: Record<string, string>) => void) => {
    const result = validationSchema.safeParse(values);
    let validationErrors;
  
    if ('error' in result && result.error) {
      validationErrors = (result.error as ZodError)?.issues.reduce((acc, { message, path }) => {
        const formattedFieldName = path.join('.');
        if (touchedFields.current[formattedFieldName]) {
          acc[formattedFieldName] = message;
        }
        return acc;
      }, {} as Record<string, string>);

    } else {
      validationErrors = {};
    }
    setErrors(validationErrors);
    callback?.(validationErrors);
  };

  const onChange = <N extends keyof InitValue>(fieldName: N, value: InitValue[N]) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  const onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    touchedFields.current[event.target.name] = true;
  }

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    onValidate();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    touchedFields.current = reduce(initValues, (acc, _, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    onValidate((validationErrors: Record<string, string>) => {
      if (isEmpty(validationErrors)) {
        onSubmit(values, null);
      } else {
        onSubmit(null, validationErrors);
      }
    });
  }

  const onReset = () => {
    touchedFields.current = {};
    setErrors({});
    setValues(initValues);
  };

  const contextValues: FormContextValue<InitValue> = {
    errors,
    onBlur,
    onFocus,
    onChange,
    onReset,
    values,
  };

  return (
    <FormContext.Provider value={contextValues}>
      <form className={className} onSubmit={handleSubmit} onReset={onReset} ref={ref} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
});

export const useForm = (): FormContextValue<any> => useContext(FormContext) as FormContextValue<any>;

export default Form;