import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import { IBusEvent } from 'src/types';
import uuid = require('uuid/v4');
import { dispatch } from '../../../bus/commandBus';
import { fetch } from '../../../bus/queryBus';
import { LoginCommand, LogoutCommand, RegisterCommand } from '../types';

function correlatedEvent<T extends IBusEvent>(event: T): T {
  return Object.assign({}, event, {
    correlationId: uuid()
  });
}

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
    logout: Boolean!
  }
`;

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { sid }) =>
      dispatch(
        correlatedEvent(
          LoginCommand({
            email,
            password,
            sid
          })
        )
      ),

    logout: async (_, __, { sid }) =>
      dispatch(
        correlatedEvent(
          LogoutCommand({
            sid
          })
        )
      ),

    register: async (_, { email, password, role }) =>
      dispatch(
        correlatedEvent(
          RegisterCommand({
            email,
            password,
            role
          })
        )
      )
  },
  Query: {
    currentUser: async (_, __, { userToken }) =>
      await fetch('currentUser', {
        id: userToken && userToken.id,
        userToken
      })
  }
};
