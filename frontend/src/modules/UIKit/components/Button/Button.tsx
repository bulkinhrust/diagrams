import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';
import Typography from '../Typography';

export type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 'medium' | 'small';
  type?: 'fill' | 'text';
  variant?: 'base' | 'primary';
}>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    disabled,
    onClick,
    size = 'medium',
    type = 'fill',
    variant = 'base',
  } = props;
  const classname = getClassName('button');

  return (
    <button
      className={classname('', {
        disabled: !!disabled,
        [size]: true,
        [type]: true,
        [variant]: true,
      })}
      onClick={onClick}
    >
      <Typography size={size}>
        {children}
      </Typography>
    </button>
  );
};

export default Button;
