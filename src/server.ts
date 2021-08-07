require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getLoggedInUser } from "./user/user.utils";
import { graphqlUploadExpress } from "graphql-upload";

const startApolloServer = async () => {
  const PORT = process.env.PORT;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getLoggedInUser(req.headers.logintoken),
        client,
      };
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });
  await server.start();

  const app = express();

  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));
};

startApolloServer();
