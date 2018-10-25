import { createError } from 'apollo-errors';
export const NoUserFoundError = createError('NoUserFoundError', {
  message: 'We could not find you in our system'
});

export const InvalidCredentialsError = createError('InvalidCredentialsError', {
  message: 'Your credentials were invalid'
});

export const UserAlreadyExists = createError('UserAlreadyExists', {
  message: 'The user you have given already exists'
});

export const TimeoutError = createError('TimeoutError', {
  message: 'The operation timed out'
});
