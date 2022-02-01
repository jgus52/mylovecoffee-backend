import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeMyCoffeeShops: async (
      _,
      { coffeeShopCursor },
      { client, loggedInUser }
    ) => {
      console.log(loggedInUser.id);

      const coffeeShops = await client.coffeeShop.findMany({
        take: 10,
        skip: coffeeShopCursor ? 1 : 0,
        cursor: coffeeShopCursor ? { id: coffeeShopCursor } : undefined,
        where: { userId: loggedInUser.id },
      });

      console.log(coffeeShops);

      return coffeeShops;
    },
  },
};

export default resolvers;
