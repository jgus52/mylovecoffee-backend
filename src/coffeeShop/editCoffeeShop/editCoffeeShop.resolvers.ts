import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { createWriteStream } from "fs";

const resolver: Resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(async (_, { coffeeShopId, name, latitude, longitude, category, photos, deletePhotoIds }, { loggedInUser, client }) => {
      const targetCoffeeShop = await client.coffeeShop.findUnique({ where: { id: coffeeShopId }, include: { user: true, category: true } });

      if (!targetCoffeeShop) return { ok: false, error: "no coffeeshop found" };
      else if (targetCoffeeShop.user.id != loggedInUser.id) return { ok: false, error: "not valid" };
      else {
        //connect or disconnect or createAndConnect Category
        let categoryObj = undefined;
        if (category) {
          let targetCategory = await client.category.findUnique({ where: { name: category } });

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
            const check = await client.coffeeShop.findFirst({
              where: {
                id: coffeeShopId,
                category: { some: { name: category } },
              },
            });
            if (!check) {
              categoryObj = {
                connect: { id: targetCategory.id },
              };
            } else {
              categoryObj = {
                disconnect: { id: targetCategory.id },
              };
            }
          }
        }
        //if there is photo for upload
        if (photos) {
          console.log(photos);
          photos.forEach(async (photo) => {
            const { filename, createReadStream } = await photo;
            const newFilename = `${loggedInUser.id}-${targetCoffeeShop.name}.${coffeeShopId}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
            readStream.pipe(writeStream);
            let newPhotoUrl = `http://localhost:4000/static/${newFilename}`;

            //let newPhotoUrl = `PhotoURL`;
            await client.coffeeShopPhoto.create({
              data: {
                url: newPhotoUrl,
                shop: {
                  connect: {
                    id: coffeeShopId,
                  },
                },
              },
            });
          });
        }

        //update
        await client.coffeeShop.update({
          where: { id: coffeeShopId },
          data: {
            name,
            latitude,
            longitude,
            category: categoryObj,
          },
        });

        //if deleted any photo
        if (deletePhotoIds) {
          deletePhotoIds.forEach(async (deletePhotoId) => {
            const ok = await client.coffeeShop.findFirst({
              where: { id: coffeeShopId, coffeeShopPhoto: { some: { id: deletePhotoId } } },
            });
            if (!ok) return;

            await client.coffeeShopPhoto.delete({
              where: { id: deletePhotoId },
            });
          });
        }

        return {
          ok: true,
        };
      }
    }),
  },
};

export default resolver;
