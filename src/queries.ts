import auth from './features/auth/queries';

const config = [auth];

export default function apply() {
  config.forEach(init => {
    init();
  });
}
