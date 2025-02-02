import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

import classes from './Card.module.scss';

type Props = PropsWithChildren<{
  className: string;
}>;

const Card: React.FC<Props> = (props) => {
  const { children, className } = props;
  const classname = getClassName('card');

  return (
    <div className={classname('', [className])}>
      {children}
    </div>
  );
};

export default Card;
