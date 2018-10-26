import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Register'),
  loading: () => <span />,
  modules: ['./Register'],
  webpack: () => [require.resolveWeak('./Register') as number],
});
