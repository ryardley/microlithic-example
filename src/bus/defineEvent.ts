interface ICorrelated {
  correlationId: string;
}

interface IWithType {
  type: string;
}

function defineEvent<IPropShape>(type: string) {
  return class implements ICorrelated, IWithType {
    public type: string;
    public correlationId: string;
    public costructor(props: IPropShape & ICorrelated) {
      this.type = type;
      this.correlationId = props.correlationId;
      Object.apply(this, props);
    }
  };
}
