import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import client from "../../client";

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    createCoffeeShop: protectedResolver(async (_, { name, latitude, longitude, category, photos }, { loggedInUser, client }) => {
      let categoryObj = undefined;
      if (category) {
        categoryObj = {
          where: {
            //만약 카테고리 이름이 category인 게 있으면 여기에 연결한다.
            name: category,
          },
          create: {
            name: category,
            slug: category,
          },
        };
      }

      const newCoffeeShop = await client.coffeeShop.create({
        data: {
          name,
          latitude,
          longitude,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          ...(categoryObj && {
            category: {
              connectOrCreate: categoryObj,
            },
          }),
        },
      });

      if (photos) {
        photos.forEach(async (photo) => {
          const { filename, createReadStream } = await photo;
          const newFilename = `${loggedInUser.id}-${newCoffeeShop.name}.${newCoffeeShop.id}-${Date.now()}-${filename}`;
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
                  id: newCoffeeShop.id,
                },
              },
            },
          });
        });
      }

      return {
        ok: true,
        coffeeShopId: newCoffeeShop.id,
      };
    }),
  },
};

export default resolvers;
