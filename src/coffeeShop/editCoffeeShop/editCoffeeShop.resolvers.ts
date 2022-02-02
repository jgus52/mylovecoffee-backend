import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { createWriteStream } from "fs";
import { uploadS3 } from "../../shared.utils";

const resolver: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { coffeeShopId, name, address, category, content },
        { loggedInUser, client }
      ) => {
        const targetCoffeeShop = await client.coffeeShop.findUnique({
          where: { id: coffeeShopId },
          include: { user: true, category: true },
        });

        if (!targetCoffeeShop)
          return { ok: false, error: "no coffeeshop found" };
        else if (targetCoffeeShop.user.id != loggedInUser.id)
          return { ok: false, error: "not valid" };
        else {
          //connect or disconnect or createAndConnect Category
          let categoryObj = undefined;
          if (category) {
            let targetCategory = await client.category.findUnique({
              where: { name: category },
            });

            if (targetCoffeeShop.category.id != targetCategory.id) {
              if (!targetCategory) {
                categoryObj = {
                  connectOrCreate: {
                    where: {
                      name: category,
                    },
                    create: {
                      name: category,
                      slug: category,
                    },
                  },
                };
              } else {
                categoryObj = {
                  connect: { id: targetCategory.id },
                };
              }
            }
          }

          //update
          await client.coffeeShop.update({
            where: { id: coffeeShopId },
            data: {
              name,
              address,
              category: categoryObj,
              content,
            },
          });

          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolver;
