import { gql } from "apollo-server-express";

export default gql`
  type mutationResult {
    ok: Boolean!
    error: String
  }
`;
