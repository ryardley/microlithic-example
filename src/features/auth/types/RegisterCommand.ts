import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type RegisterCommand = BusEvent<{
  type: 'RegisterCommand';
  email: string;
  password: string;
  role: 'admin' | 'user';
}>;

export const RegisterCommand = declareEvent<RegisterCommand>('RegisterCommand');
