import React from 'react';

import classes from './Sidebar.module.scss';

type Props = {
};

const Sidebar: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <nav className={classes.component}>
      <h1>Crafty Craft</h1>
    </nav>
  );
};

export default Sidebar;