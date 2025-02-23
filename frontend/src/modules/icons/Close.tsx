import React from 'react';

import Icon, { IconProps } from './Icon';

const Close: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Close-icon" color={color} size={size}>
    <path d="M5 5L19 19M19 5L5 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Icon>
);

export default Close;