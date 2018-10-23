import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import { sendCommand } from '../../../bus/commandBus';
import { fetch } from '../../../bus/queryBus';
// import login from '../commands/login';
// import logout from '../commands/logout';
// import register from '../commands/register';

// import currentUser from '../queries/currentUser';

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
    login: async (_, { email, password }, { sid }) => {
      sendCommand('login', { email, password, sid });
      return true;
    },
    logout: async (_, __, { sid }) => {
      sendCommand('logout', { sid });
      return true;
    },
    register: async (_, { email, password, role }) => {
      sendCommand('register', { email, password, role });
      return true;
    }
  },
  Query: {
    currentUser: async (_, __, { userToken }) => {
      return await fetch('currentUser', {
        id: userToken && userToken.id,
        userToken
      });
    }
  }
};
