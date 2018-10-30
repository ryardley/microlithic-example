import { BusEvent, declareEvent } from '../../../bus/BusEvent';

export type LogoutCommand = BusEvent<{
  type: 'LogoutCommand';
  sid: string;
}>;

export const LogoutCommand = declareEvent<LogoutCommand>('LogoutCommand');
