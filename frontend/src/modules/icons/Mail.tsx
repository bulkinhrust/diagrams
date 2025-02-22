import React from 'react';

import Icon, { IconProps } from './Icon';

const Mail: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Mail-icon" color={color} size={size}>
    <path d="M21.0015 9C18.4942 10.8837 15.3775 12 12 12C8.62252 12 5.50577 10.8837 2.99854 9M5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Icon>
);

export default Mail;