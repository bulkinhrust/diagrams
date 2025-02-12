import React from 'react';

import classes from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {
  const {} = props;

  return (
    <div className={classes.component}>
      Dashboard
    </div>
  );
};

export default Dashboard;
