import { protectedResolver } from "./user.utils";

export default {
  User: {
    totalFollowing: ({ id }, _, { client }) => client.user.count({ where: { followers: { some: { id } } } }),
    totalFollower: ({ id }, _, { client }) => client.user.count({ where: { following: { some: { id } } } }),
    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;
      const isFollow = await client.user.findFirst({ where: { following: { some: { id } } } });
      if (isFollow) return true;
      else return false;
    },
    loggedIn: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return id == loggedInUser.id;
    },
  },
};
