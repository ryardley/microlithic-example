import * as bus from '../../../eventbus';

export default (session: any) => {
  bus.subscribe<{ userId: string }>('auth.userLoggedIn', ({ userId }) => {
    session.userId = userId; // store userId on session
    console.log({ userId });
  });
};
