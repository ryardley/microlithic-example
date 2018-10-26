import universal from 'react-universal-component';

// export default universal(() => import('./Dashboard'));

const load = () => Promise.all([import(`./Dashboard`)]).then(proms => proms[0]);

export default universal(load, {
  chunkName: () => 'Dashboard',
  resolve: () => require.resolveWeak(`./Dashboard`),
});
