import * as React from 'react';
import Helmet from 'react-helmet-async';
import Navigation from '../../navigation/view';

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props) => (
  <div>
    <Helmet>
      <title>Microlithic application!</title>
    </Helmet>
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
