import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";

const resolver: Resolvers = {
  Query: {
    seeMe: protectedResolver(async (_, __, { loggedInUser, client }) => {
      return client.user.findUnique({ where: { id: loggedInUser.id } });
    }),
  },
};

export default resolver;
