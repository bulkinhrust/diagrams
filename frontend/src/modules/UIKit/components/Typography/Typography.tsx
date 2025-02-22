import React, { PropsWithChildren } from 'react';

import { getClassName } from '../../utils/getClassName';

export type TypographyProps = PropsWithChildren<{
  size?: 'medium' | 'small';
}>;

const Typography: React.FC<TypographyProps> = (props) => {
  const {
    children,
    size = 'medium',
  } = props;
  const classname = getClassName('typography');

  return (
    <span
      className={classname('', {
        [size]: !!size,
      })}
    >
      {children}
    </span>
  );
};

export default Typography;