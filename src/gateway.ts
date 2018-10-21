import { Application } from 'express';
import auth from './features/auth/gateway';
import applyRoutes from './routes';

const gateways = [auth, applyRoutes];

export default function applyGateway(app: Application) {
  return gateways.reduce((appl, gateway) => gateway(appl), app);
}
