import React, { ChangeEventHandler, useState } from 'react';

import classes from './TextField.module.scss';

type Props = {
  label?: string;
  name?: string;
  placeholder?: string;
};

const TextField: React.FC<Props> = (props) => {
  const { label, name, placeholder } = props;
  const [value, setValue] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.component}>
      {!label && <div>{label}</div>}
      <input
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
