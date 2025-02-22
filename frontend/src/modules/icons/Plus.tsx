import React from 'react';

import Icon, { IconProps } from './Icon';

const Plus: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Plus-icon" color={color} size={size}>
    <path d="M12 4V12M12 12V20M12 12H4M12 12H20" stroke={color} stroke-width="2" stroke-linecap="round"/>
  </Icon>
);

export default Plus;