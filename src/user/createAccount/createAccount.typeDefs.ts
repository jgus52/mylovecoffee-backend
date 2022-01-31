import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: Upload
      githubUsername: String!
    ): mutationResult!
  }
  type Query {
    dummy: String
  }
`;
