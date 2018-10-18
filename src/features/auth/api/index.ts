import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import { findUserById } from '../queries';

import login from '../commands/login';
import logout from '../commands/logout';
import register from '../commands/register';

export const typeDefs = gql`
  type User {
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!, role: String!): Boolean!
    login(email: String!, password: String!): Boolean!
    logout: Boolean!
  }
`;

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { sid }) => {
      return await login(email, password, sid);
    },
    logout: async (_, __, { sid }) => {
      return await logout(sid);
    },
    register: async (_, { email, password, role }) => {
      return await register(email, password, role);
    }
  },
  Query: {
    me: async (_, __, { userToken }) => {
      return findUserById(userToken, userToken && userToken.id);
    }
  }
};
