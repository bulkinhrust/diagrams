import React from 'react';

import Icon, { IconProps } from './Icon';

const Warning: React.FC<IconProps> = ({ color = 'currentColor', size }) => (
  <Icon data-testid="Warning-icon" color={color} size={size}>
    <path d="M10.75 10.0192V13.0134M9.02645 4.99036L2.02481 16.998C1.24885 18.3288 2.20836 20 3.74836 20H17.7516C19.2916 20 20.2511 18.3288 19.4752 16.998L12.4735 4.99035C11.7036 3.66988 9.79642 3.66988 9.02645 4.99036Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="9.5" y="14.9791" width="2.5" height="2.5" rx="1.25" fill={color} />
  </Icon>
);

export default Warning;