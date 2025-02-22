import React from 'react';

import Icon, { IconProps } from './Icon';

const Close: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Close-icon" color={color} size={size}>
    <path d="M5 5L19 19M19 5L5 19" stroke={color} stroke-width="2" stroke-linecap="round" />
  </Icon>
);

export default Close;