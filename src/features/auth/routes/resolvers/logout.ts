import CommandBus from '../../../../bus/CommandBus';
import { LogoutCommand } from '../../types/LogoutCommand';

export default async (_: any, __: any, { sid }: { sid: string }) => {
  CommandBus.dispatch(
    LogoutCommand({
      sid,
    })
  );
};
