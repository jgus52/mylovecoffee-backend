import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { coffeeShopId }, { client, loggedInUser }) => {
      await client.coffeeShopPhoto.deleteMany({
        where: { coffeeShopId },
      });

      await client.coffeeShop.delete({
        where: { id: coffeeShopId },
      });

      return {
        ok: true,
      };
    }),
  },
};

export default resolver;
