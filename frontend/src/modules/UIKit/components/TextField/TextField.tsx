import React, { ChangeEventHandler, useState } from 'react';
import { getClassName } from '../../utils/getClassName';

import classes from './TextField.scss';

type Props = {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
};

const TextField: React.FC<Props> = (props) => {
  const { label, name, placeholder, ...otherProps } = props;
  const classname = getClassName('tf');
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classname({ fill: !!value })}>
      {!!label && <div>{label}</div>}
      <input
        className={classname('input', { fill: !!value })}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        {...otherProps}
      />
    </div>
  );
};

export default TextField;
