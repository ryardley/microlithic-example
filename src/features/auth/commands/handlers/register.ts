import * as bcrypt from 'bcryptjs';
import { dispatch } from '../../../../bus/EventBus';
import { UserRegisteredEvent } from '../../types/UserRegisteredEvent';

import { RegisterCommand } from '../../types/RegisterCommand';

export default async ({
  email,
  password,
  role,
  correlationId
}: RegisterCommand) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  dispatch(
    UserRegisteredEvent({
      correlationId,
      email,
      password: hashedPassword,
      role
    })
  );
};
