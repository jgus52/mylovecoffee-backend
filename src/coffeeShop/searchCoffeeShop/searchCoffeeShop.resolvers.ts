import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchCoffeeShop: (_, { search }, { client }) => {
      const lowerSearch = search.toLowerCase();
      const coffeeShops = client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: { contains: search, mode: "insensitive" },
            },
            {
              category: { name: search },
            },
            {
              address: { contains: search, mode: "insensitive" },
            },
          ],
        },
      });

      return coffeeShops;
    },
  },
};

export default resolvers;
