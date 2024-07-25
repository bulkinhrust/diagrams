import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const Button: React.FC<Props> = (props) => {
  const { children, onClick } = props;
  const classname = getClassName('btn');

  return (
    <button
      className={classname()}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
