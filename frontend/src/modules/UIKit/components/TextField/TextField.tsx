import React, { ChangeEventHandler, useRef, useState } from 'react';
import { getClassName } from '../../utils/getClassName';

export type TextFieldProps = {
  endAdornment?: React.ReactNode;
  error?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    endAdornment,
    error,
    label,
    name,
    placeholder,
    startAdornment,
    ...otherProps
  } = props;
  const classname = getClassName('tf');
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
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
      
    </div>
  );
};

export default TextField;
