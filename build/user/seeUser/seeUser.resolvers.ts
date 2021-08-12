import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeUser: async (_, { username, followingCursor, followerCursor }, { client }) => {
      const userReturn = await client.user.findUnique({
        where: { username },
      });

      const following = await client.user.findUnique({ where: { username } }).following({
        take: 5,
        skip: followingCursor ? 1 : 0,
        cursor: followingCursor ? { id: followingCursor } : undefined,
      });

      const follower = await client.user.findUnique({ where: { username } }).followers({
        take: 5,
        skip: followerCursor ? 1 : 0,
        cursor: followerCursor ? { id: followingCursor } : undefined,
      });
      return {
        ok: true,
        User: userReturn,
        following,
        follower,
        followingCursor: following.length ? following[following.length - 1].id : undefined,
        followerCursor: follower.length ? follower[follower.length - 1].id : undefined,
      };
    },
  },
};

export default resolvers;
