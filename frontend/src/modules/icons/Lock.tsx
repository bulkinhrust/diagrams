import React from 'react';

import Icon, { IconProps } from './Icon';

const Lock: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Lock-icon" color={color} size={size}>
    <path d="M16 10V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10M12 14V17M7 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10H7C5.89543 10 5 10.8954 5 12V19C5 20.1046 5.89543 21 7 21Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
);

export default Lock;