import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seeCategory: async (_, { categoryId, coffeeShopCursor }, { client }) => {
      const category = client.category.findUnique({ where: categoryId });
      if (!category) return null;

      return client.coffeeShop.findMany({
        skip: coffeeShopCursor ? 1 : 0,
        take: 10,
        cursor: coffeeShopCursor ? { id: coffeeShopCursor } : undefined,
        where: {
          category: {
            some: { id: categoryId },
          },
        },
      });
    },
  },
};
export default resolver;
