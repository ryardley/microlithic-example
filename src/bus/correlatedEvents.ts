import uuid from 'uuid/v4';
import { IBusEvent } from './IBusEvent';

export default function correlatedEvent<T extends IBusEvent>(
  event: T
): T & { correlationId: string } {
  return Object.assign({}, event, {
    correlationId: uuid()
  });
}
