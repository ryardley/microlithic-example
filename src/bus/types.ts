import { IBusEvent } from './IBusEvent';

export type Event<T, S> = IBusEvent &
  T & {
    type: S;
  };

export type CorrelatedData<D> = D & {
  correlationId?: string;
};
