import { Resolvers } from "../types";

const resolver: Resolvers = {
  CoffeeShop: {
    category: ({ id }, _, { client }) => {
      return client.category.findMany({
        where: { shops: { some: { id } } },
      });
    },
    photos: ({ id }, _, { client }) => {
      return client.coffeeShopPhoto.findMany({
        where: { shop: { id } },
      });
    },
  },
  Category: {
    totalShops: ({ id }, _, { client }) => {
      return client.coffeeShop.count({
        where: { category: { some: { id } } },
      });
    },
  },
};

export default resolver;
