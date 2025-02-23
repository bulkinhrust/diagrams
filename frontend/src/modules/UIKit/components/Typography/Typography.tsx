import React, { PropsWithChildren } from 'react';

import { getClassName } from '../../utils/getClassName';

export type TypographyProps = PropsWithChildren<{
  className?: string;
  size?: 'medium' | 'small';
  type?: 'base' | 'error' | 'success';
}>;

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    className,
    children,
    size = 'medium',
    type = 'base',
  } = props;
  const classname = getClassName('typography');

  return (
    <span
      className={classname('', {
        [size]: true,
        [type]: true,
      }, className)}
    >
      {children}
    </span>
  );
};

export default Typography;