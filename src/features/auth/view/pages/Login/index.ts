import universal from 'react-universal-component';

// export default universal(() => import('./Login'));

const load = () => Promise.all([import(`./Login`)]).then(proms => proms[0]);

export default universal(load, {
  chunkName: () => 'Login',
  resolve: () => require.resolveWeak(`./Login`),
});
