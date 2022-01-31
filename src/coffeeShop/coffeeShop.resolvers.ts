import { Resolvers } from "../types";

const resolver: Resolvers = {
  CoffeeShop: {
    category: async ({ id }, _, { client }) => {
      const cate = await client.category.findFirst({
        where: { shops: { some: { id } } },
      });
      return cate;
    },
    photos: ({ id }, _, { client }) => {
      return client.coffeeShopPhoto.findMany({
        where: { shop: { id } },
      });
    },
  },
  Category: {
    // id: ({ id }) => {
    //   return id;
    // },
    // name: async ({ id }, _, { client }) => {
    //   const cate = await client.category.findUnique({
    //     where: { id: id },
    //   });
    //   return cate.name;
    // },
    totalShops: ({ id }, _, { client }) => {
      return client.coffeeShop.count({
        where: { categoryId: id },
      });
    },
  },
};

export default resolver;
