import gql from 'graphql-tag';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { CurrentUserData } from './types/CurrentUserData';

type Props = {
  children: (result: QueryResult<CurrentUserData>) => React.ReactNode;
};

const CURRENT_USER_DATA_QUERY = gql`
  query CurrentUserData {
    currentUser {
      email
    }
  }
`;

export default ({ children }: Props) => (
  <Query<CurrentUserData> query={CURRENT_USER_DATA_QUERY}>{children}</Query>
);
