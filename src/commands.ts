import auth from './features/auth/commands';

const config = [auth];

export default function apply() {
  config.forEach(init => {
    init();
  });
}
