import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import { dispatch } from '../../../bus/commandBus';
import { fetch } from '../../../bus/queryBus';
import { LoginCommand, LogoutCommand, RegisterCommand } from '../types';

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
      dispatch<LoginCommand>({
        email,
        password,
        sid,
        type: 'LoginCommand'
      }),

    logout: async (_, __, { sid }) =>
      dispatch<LogoutCommand>({ type: 'LogoutCommand', sid }),

    register: async (_, { email, password, role }) =>
      dispatch<RegisterCommand>({
        email,
        password,
        role,
        type: 'RegisterCommand'
      })
  },
  Query: {
    currentUser: async (_, __, { userToken }) =>
      await fetch('currentUser', {
        id: userToken && userToken.id,
        userToken
      })
  }
};
