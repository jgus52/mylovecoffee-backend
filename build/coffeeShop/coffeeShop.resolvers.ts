import { Resolvers } from "../types";

const resolver: Resolvers = {
  Category: {
    totalShops: ({ id }, _, { client }) => {
      return client.coffeeShop.count({
        where: { category: { some: { id } } },
      });
    },
  },
};

export default resolver;
