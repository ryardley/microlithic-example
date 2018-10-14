import * as React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

export default function routeLoader(loader: () => Promise<any>) {
  return Loadable({
    loader,
    loading: Loading
  });
}
