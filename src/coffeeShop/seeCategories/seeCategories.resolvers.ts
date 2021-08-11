import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seeCategories: async (_, { categoryCursor }, { client }) => {
      return client.category.findMany({
        skip: categoryCursor ? 1 : 0,
        take: 10,
        cursor: categoryCursor ? { id: categoryCursor } : undefined,
      });
    },
  },
};

export default resolver;
