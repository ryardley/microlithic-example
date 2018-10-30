import uuid from 'uuid/v4';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type HasType = {
  type: string;
};

type IsCorrelated<T> = T & {
  correlationId: string;
};

export type BaseEvent = BusEvent<HasType>;

export type BusEvent<T extends HasType> = IsCorrelated<T>;

export function declareEvent<EventShape extends BusEvent<{ type: string }>>(
  type: EventShape['type']
) {
  type EventWithoutTypeOrCorrelation = Omit<
    IsCorrelated<EventShape>,
    'type' | 'correlationId'
  >;

  type CorrolatedEventWithoutType = Omit<IsCorrelated<EventShape>, 'type'>;
  type FullyCorrelatedEvent = IsCorrelated<EventShape>;

  function createEvent(e1: CorrolatedEventWithoutType) {
    return {
      type,
      ...(e1 as object),
    } as FullyCorrelatedEvent;
  }

  function createCorrelatedEvent(e2: EventWithoutTypeOrCorrelation) {
    return {
      correlationId: uuid(),
      type,
      ...(e2 as object),
    } as FullyCorrelatedEvent;
  }

  return Object.assign(createEvent, { correlated: createCorrelatedEvent });
}
