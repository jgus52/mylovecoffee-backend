import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getLoggedInUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = (targetResolver: Resolver) => async (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "you need login",
    };
  }
  return targetResolver(root, args, context, info);
};
