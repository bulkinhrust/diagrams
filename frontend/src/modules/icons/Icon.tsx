import React, { PropsWithChildren } from 'react';

export type IconProps = {
  color?: string;
  size?: number;
};

const Icon: React.FC<PropsWithChildren<IconProps>> = ({ children, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

export default Icon;