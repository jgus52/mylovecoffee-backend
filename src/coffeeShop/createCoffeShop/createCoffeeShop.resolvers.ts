import { Resolvers } from "../../types";
import { protectedResolver } from "../../user/user.utils";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import client from "../../client";
import { uploadS3 } from "../../shared.utils";

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, address, category, photos, content },
        { loggedInUser, client }
      ) => {
        let categoryObj = undefined;
        if (category) {
          categoryObj = {
            where: {
              //만약 카테고리 이름이 category인 게 있으면 여기에 연결한다.
              name: category.toLowerCase(),
            },
            create: {
              name: category.toLowerCase(),
              slug: category,
            },
          };
        }

        const newCoffeeShop = await client.coffeeShop.create({
          data: {
            name,
            address,
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
            content,
          },
        });

        let retPhotos = [];
        if (photos) {
          for await (const photo of photos) {
            let newPhotoUrl = await uploadS3(photo, loggedInUser.id);
            // const { filename, createReadStream } = await photo;
            // const newFilename = `${loggedInUser.id}-${newCoffeeShop.name}.${
            //   newCoffeeShop.id
            // }-${Date.now()}-${filename}`;
            // const readStream = createReadStream();
            // const writeStream = createWriteStream(
            //   process.cwd() + "/uploads/" + newFilename
            // );
            // readStream.pipe(writeStream);
            // let newPhotoUrl = `http://localhost:4000/static/${newFilename}`;

            //let newPhotoUrl = `PhotoURL`;

            retPhotos.push(
              await client.coffeeShopPhoto.create({
                data: {
                  url: newPhotoUrl,
                  shop: {
                    connect: {
                      id: newCoffeeShop.id,
                    },
                  },
                },
              })
            );
          }
        }

        return {
          ok: true,
          coffeeShop: newCoffeeShop,
        };
      }
    ),
  },
};

export default resolvers;
