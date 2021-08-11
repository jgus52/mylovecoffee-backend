import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seeCoffeeShop: async (_, { coffeeShopId }, { client }) => {
      return client.coffeeShop.findUnique({
        where: { id: coffeeShopId },
      });
    },
  },
};

export default resolver;
