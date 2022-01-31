import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeMyCoffeeShops: async (
      _,
      { coffeeShopCursor },
      { client, loggedInUser }
    ) => {
      const coffeeShops = client.coffeeShop.findMany({
        take: 10,
        skip: coffeeShopCursor ? 1 : 0,
        cursor: coffeeShopCursor ? { id: coffeeShopCursor } : undefined,
        where: { userId: loggedInUser.id },
      });

      return coffeeShops;
    },
  },
};

export default resolvers;
