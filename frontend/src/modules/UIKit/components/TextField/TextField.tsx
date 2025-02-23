import React, { ChangeEvent, useRef } from 'react';
import { getClassName } from '../../utils/getClassName';
import { useForm } from '../Form';
import Typography from '../Typography';

export type TextFieldProps = {
  autocomplete?: string | boolean;
  endAdornment?: React.ReactNode;
  label?: string;
  name: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    endAdornment,
    label,
    name,
    placeholder,
    startAdornment,
    ...otherProps
  } = props;
  const classname = getClassName('tf');
  const ref = useRef<HTMLInputElement>(null);
  const { errors, onBlur, onChange, onFocus, values } = useForm();
  const error = errors[name];
  const value = values[name];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  const handleClick = () => {
    ref.current?.focus();
  }

  return (
    <div
      className={classname({
        error: !!error,
        fill: !!value,
      })}
      onClick={handleClick}
    >
      {!!label && <div>{label}</div>}
      <div className={classname('field')}>
        {!!startAdornment && (
          <span className={classname('startAdornment')}>
            {startAdornment}
          </span>
        )}
        <input
          className={classname('input')}
          name={name}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          value={value}
          {...otherProps}
        />
        {!!endAdornment && (
          <span className={classname('endAdornment')}>
            {endAdornment}
          </span>
        )}
      </div>
      {!!error && <Typography size="small" type="error">{error}</Typography>}
    </div>
  );
};

export default TextField;
