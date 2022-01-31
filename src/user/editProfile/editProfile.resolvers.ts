//https://www.apollographql.com/docs/apollo-server/data/file-uploads/
//File Upload docs

import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";
import { createWriteStream } from "fs";
import { uploadS3 } from "../../shared.utils";
import { GraphQLUpload } from "graphql-upload";

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password,
        },
        { loggedInUser, client }
      ) => {
        let newPassword = undefined;

        if (password != undefined) {
          newPassword = await bcrypt.hash(password, 10);
        }

        let newAvatarURL = undefined;
        if (avatarURL) {
          newAvatarURL = await uploadS3(avatarURL, loggedInUser.id);
        }

        const edited = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            avatarURL: newAvatarURL,
            githubUsername,
            password: newPassword,
          },
        });

        if (edited.id) {
          return { ok: true };
        } else {
          return { ok: false, error: "cannot update" };
        }
      }
    ),
  },
};

export default resolvers;
