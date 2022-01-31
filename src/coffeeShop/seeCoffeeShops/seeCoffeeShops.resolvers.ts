import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: async (_, { coffeeShopCursor, userId }, { client }) => {
      const coffeeShops = await client.coffeeShop.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take: 5,
        skip: coffeeShopCursor ? 1 : 0,
        cursor: coffeeShopCursor ? { id: coffeeShopCursor } : undefined,
        where: userId ? { userId } : undefined,
      });

      //console.log(coffeeShops);

      return coffeeShops;
    },
  },
};

export default resolvers;
