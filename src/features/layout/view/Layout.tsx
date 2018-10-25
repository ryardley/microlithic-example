import * as React from 'react';
import Navigation from '../../navigation/view';

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
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  </div>
);
