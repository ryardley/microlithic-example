import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Login'),
  loading: () => <span />,
  modules: ['./Login'],
  webpack: () => [require.resolveWeak('./Login') as number],
});
