import * as React from 'react';
import Navigation from '../../navigation/ui';

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props) => (
  <div>
    <Navigation />
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  </div>
);
