import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'base' | 'primary';
}>;

const Button: React.FC<Props> = (props) => {
  const { children, onClick, variant = 'base' } = props;
  const classname = getClassName('btn');

  return (
    <button
      className={classname('', { [variant]: !!variant })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
