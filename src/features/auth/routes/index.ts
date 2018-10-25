import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import * as CommandBus from '../../../bus/CommandBus';
import correlatedEvent from '../../../bus/correlatedEvents';
import * as EventBus from '../../../bus/EventBus';
import * as QueryBus from '../../../bus/QueryBus';

import { CurrentUserRequest } from '../types/CurrentUserRequest';
import { CurrentUserResponse } from '../types/CurrentUserResponse';
import { LoginCommand } from '../types/LoginCommand';
import { LoginErrorRaised } from '../types/LoginErrorRaised';
import { LogoutCommand } from '../types/LogoutCommand';
import { RegisterCommand } from '../types/RegisterCommand';
import { UserLoggedInEvent } from '../types/UserLoggedInEvent';
import { UserRegisteredEvent } from '../types/UserRegisteredEvent';

export const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    register(email: String!, password: String!, role: String!): Boolean
    login(email: String!, password: String!): Boolean
    logout: Boolean
  }
`;

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { sid }) => {
      // Create the command event with a correlationId
      const event = correlatedEvent(
        LoginCommand({
          email,
          password,
          sid
        })
      );

      // Dispatch it
      CommandBus.dispatch(event);

      // This will wait for the corresponding resultant event
      const answer = await EventBus.waitForEvent(event.correlationId, [
        UserLoggedInEvent,
        LoginErrorRaised
      ]);

      if (answer.type === 'LoginErrorRaised') {
        // throw new LoginError();
        return false;
      }

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

      await EventBus.waitForEvent(event.correlationId, [UserRegisteredEvent]);
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
      const response = await QueryBus.waitForEvent(event.correlationId, [
        CurrentUserResponse
      ]);
      if (response.type === 'TimeoutEvent') {
        // throw new Error()
        return null;
      }
      return (response as CurrentUserResponse).user;
    }
  }
};
