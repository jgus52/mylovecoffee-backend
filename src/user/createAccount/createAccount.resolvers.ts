import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { username, email, name, location, password, avatarURL, githubUsername }, { client }) => {
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

        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: hashedPwd,
            avatarURL,
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
