import uuid from 'uuid/v4';

type WithType<T, P> = T & {
  type: P;
};

type Correlated<T> = T & {
  correlationId: string;
};
export type Event<EShape, EString> = WithType<Correlated<EShape>, EString>;

export default function defineEvent<EventShape, EventString>(
  type: EventString
) {
  type EventFn = (
    props: EventShape & { correlationId: string }
  ) => EventShape & {
    correlationId: string;
    type: EventString;
  };

  type EventFnCorrelated = (
    props: EventShape
  ) => EventShape & {
    correlationId: string;
    type: EventString;
  };

  type CustomEventFn = EventFn & { correlated: EventFnCorrelated };
  const CustomEvent = (props: EventShape & { correlationId: string }) =>
    Object.assign({}, props, { type });

  const wFn = {
    correlated: (props: EventShape) =>
      Object.assign({}, props, { correlationId: uuid() }, { type }),
  };

  return Object.assign(CustomEvent, wFn) as CustomEventFn;
}
