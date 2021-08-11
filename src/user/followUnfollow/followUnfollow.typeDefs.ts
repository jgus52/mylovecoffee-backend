import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    followUser(toFollow: String): mutationResult
  }
`;
