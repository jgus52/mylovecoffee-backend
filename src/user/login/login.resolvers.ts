import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const errorReturn = { ok: false, error: "No username or wrong password" };

      const loginUser = await client.user.findUnique({ where: { username } });

      if (!loginUser) return errorReturn;

      const checkPwd = await bcrypt.compare(password, loginUser.password);

      if (!checkPwd) return errorReturn;

      const token = await jwt.sign(
        { id: loginUser.id },
        process.env.SECRET_KEY,
        { expiresIn: "2D" }
      );

      return { ok: true, userId: loginUser.id, token };
    },
  },
};

export default resolvers;
