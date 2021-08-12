import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { coffeeShopCursor }, { client }) => {
      const coffeeShops = client.coffeeShop.findMany({
        take: 10,
        skip: coffeeShopCursor ? 1 : 0,
        cursor: coffeeShopCursor ? { id: coffeeShopCursor } : undefined,
      });

      return coffeeShops;
    },
  },
};

export default resolvers;
