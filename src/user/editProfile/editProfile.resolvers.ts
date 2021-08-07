//https://www.apollographql.com/docs/apollo-server/data/file-uploads/
//File Upload docs

import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../user.utils";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(async (_, { username, email, name, avatarURL, githubUsername, password }, { loggedInUser, client }) => {
      let newPassword = undefined;

      if (password != undefined) {
        newPassword = await bcrypt.hash(password, 10);
      }

      let newAvatarURL = undefined;

      if (avatarURL) {
        const { filename, createReadStream } = await avatarURL;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        //readstream 으로 읽은 파일을 writestream을 통해 upload로 올림
        readStream.pipe(writeStream);
        newAvatarURL = `http://localhost:4000/static/${newFilename}`;
      }

      const edited = await client.user.update({
        where: { id: loggedInUser.id },
        data: { username, email, name, avatarURL: newAvatarURL, githubUsername, password: newPassword },
      });

      if (edited.id) {
        return { ok: true };
      } else {
        return { ok: false, error: "cannot update" };
      }
    }),
  },
};

export default resolvers;
