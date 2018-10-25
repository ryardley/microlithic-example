import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import currentUser from './resolvers/currentUser';
import login from './resolvers/login';
import logout from './resolvers/logout';
import register from './resolvers/register';

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
    login,
    logout,
    register
  },
  Query: {
    currentUser
  }
};
