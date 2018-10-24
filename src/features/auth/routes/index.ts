import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
// import { IBusEvent } from 'src/types';
// import uuid = require('uuid/v4');
import * as CommandBus from '../../../bus/CommandBus';
import correlatedEvent from '../../../bus/correlatedEvents';
import * as EventBus from '../../../bus/EventBus';
import * as QueryBus from '../../../bus/QueryBus';
import {
  CurrentUserRequest,
  CurrentUserResponse,
  LoginCommand,
  LogoutCommand,
  RegisterCommand,
  UserLoggedInEvent,
  UserRegisteredEvent
} from '../types';

export const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    register(email: String!, password: String!, role: String!): Boolean!
    login(email: String!, password: String!): Boolean!
    logout: Boolean
  }
`;

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { sid }) => {
      // Create the command event
      const event = correlatedEvent(
        LoginCommand({
          email,
          password,
          sid
        })
      );

      // Dispatch it
      CommandBus.dispatch(event);

      // This is how you can do a synchronous request response using CQRS
      await EventBus.waitForEvent<UserLoggedInEvent>(
        event.correlationId,
        'UserLoggedInEvent'
      );
      return true;
    },

    logout: async (_, __, { sid }) => {
      CommandBus.dispatch(
        LogoutCommand({
          sid
        })
      );
    },

    register: async (_, { email, password, role }) => {
      const event = correlatedEvent(
        RegisterCommand({
          email,
          password,
          role
        })
      );

      CommandBus.dispatch(event);

      await EventBus.waitForEvent<UserRegisteredEvent>(
        event.correlationId,
        'UserRegisteredEvent'
      );
      return true;
    }
  },
  Query: {
    currentUser: async (_, __, { userToken }) => {
      const event = correlatedEvent(
        CurrentUserRequest({
          id: userToken && userToken.id,
          userToken
        })
      );

      QueryBus.dispatch(event);

      // This is how you can do a synchronous request response using CQRS
      const response = await QueryBus.waitForEvent<CurrentUserResponse>(
        event.correlationId,
        'CurrentUserResponse'
      );

      return response.user;
    }
  }
};
