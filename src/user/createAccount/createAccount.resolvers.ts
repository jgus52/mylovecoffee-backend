import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { uploadS3 } from "../../shared.utils";

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername },
      { client }
    ) => {
      try {
        const existinguserWithusername = await client.user.findFirst({
          where: { username },
        });
        if (existinguserWithusername) {
          throw "username is already taken";
        }

        const existinguserWithemail = await client.user.findFirst({
          where: { email },
        });
        if (existinguserWithemail) {
          throw "email is already taken";
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        let newAvatarURL = undefined;
        if (avatarURL) {
          newAvatarURL = await uploadS3(avatarURL, 0);
        }

        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: hashedPwd,
            avatarURL: newAvatarURL,
            githubUsername,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return { ok: false, error };
      }
    },
  },
};

export default resolvers;
