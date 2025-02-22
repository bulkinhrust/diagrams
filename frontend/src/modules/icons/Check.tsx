import React from 'react';

import Icon, { IconProps } from './Icon';

const Check: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Check-icon" color={color} size={size}>
    <path d="M3 15L9.29412 20L21 4" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Icon>
);

export default Check;