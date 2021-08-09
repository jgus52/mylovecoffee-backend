import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(async (_, { toFollow }, { loggedInUser, client }) => {
      const followingState = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
          following: {
            some: {
              username: toFollow,
            },
          },
        },
        select: {
          following: true,
        },
      });

      if (followingState) {
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                username: toFollow,
              },
            },
          },
        });
      } else {
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: {
                username: toFollow,
              },
            },
          },
        });
      }

      return {
        ok: true,
      };
    }),
  },
};

export default resolvers;
