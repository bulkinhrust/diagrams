import React from 'react';

import classes from './Main.module.scss';

type Props = {};

const Main: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className={classes.component}>
      Main
    </div>
  );
};

export default Main;
