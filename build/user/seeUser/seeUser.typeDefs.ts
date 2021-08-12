import { gql } from "apollo-server-core";

export default gql`
  type seeUserReturn {
    ok: Boolean!
    error: String
    User: User
    following: [User]
    follower: [User]
    followingCursor: Int
    followerCursor: Int
  }
  type Query {
    seeUser(username: String!, followingCursor: Int, followerCursor: Int): seeUserReturn
  }
`;
