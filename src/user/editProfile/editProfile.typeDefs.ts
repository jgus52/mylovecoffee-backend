import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type editProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(username: String, email: String, name: String, avatarURL: Upload, githubUsername: String, password: String): editProfileResult!
  }
`;