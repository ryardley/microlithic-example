import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

export default function main() {
  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
}

main();
