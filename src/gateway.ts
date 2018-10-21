import { Application } from 'express';
import auth from './features/auth/gateway';

const gateways = [auth];

export default function applyGateway(app: Application) {
  return gateways.reduce((appl, gateway) => gateway(appl), app);
}
