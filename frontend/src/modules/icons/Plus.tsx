import React from 'react';

import Icon, { IconProps } from './Icon';

const Plus: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Plus-icon" color={color} size={size}>
    <path d="M12 4V12M12 12V20M12 12H4M12 12H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </Icon>
);

export default Plus;