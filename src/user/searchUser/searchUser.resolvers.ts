import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUser: async (_, { keyword, cursor }, { client }) => {
      const users = await client.user.findMany({
        skip: cursor ? 1 : 0,
        take: 5,
        cursor: cursor ? { id: cursor } : undefined,
        where: { username: { startsWith: keyword } },
      });

      return users;
    },
  },
};

export default resolvers;
