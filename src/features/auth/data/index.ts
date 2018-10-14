import * as bcrypt from 'bcryptjs';
import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import User from './models/User';

export const typeDef = gql`
  type User {
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    logout: Boolean!
  }
`;

export const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
    logout: async (_, __, { req }) => {
      delete req.session.userId;
      return true;
    },
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        email,
        password: hashedPassword
      }).save();
      return true;
    }
  },
  Query: {
    me: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    }
  }
};
