import universal from 'react-universal-component';

// export default universal(() => import('./Register'));

const load = () => Promise.all([import(`./Register`)]).then(proms => proms[0]);

export default universal(load, {
  chunkName: () => 'Register',
  resolve: () => require.resolveWeak(`./Register`),
});
