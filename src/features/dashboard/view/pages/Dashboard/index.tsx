import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Dashboard'),
  loading: () => <div>Loading...</div>,
  modules: ['./Dashboard'],
  webpack: () => [require.resolveWeak('./Dashboard') as number],
});
