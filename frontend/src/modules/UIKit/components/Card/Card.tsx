import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

import classes from './Card.module.scss';

export type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card: React.FC<CardProps> = (props) => {
  const { children, className } = props;
  const classname = getClassName('card');

  return (
    <div className={classname('', [className])}>
      {children}
    </div>
  );
};

export default Card;
