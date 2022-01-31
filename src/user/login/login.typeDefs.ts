import { gql } from "apollo-server-core";

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    userId: Int
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): loginResult
  }
`;
