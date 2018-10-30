import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type LoginCommand = BusEvent<{
  type: 'LoginCommand';
  email: string;
  password: string; // hashed and salted clientside eventually
  sid: string;
}>;

export const LoginCommand = declareEvent<LoginCommand>('LoginCommand');
