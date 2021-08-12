require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getLoggedInUser } from "./user/user.utils";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const startApolloServer = async () => {
  const PORT = process.env.PORT;
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
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

  const httpServer = http.createServer(app);
  SubscriptionServer.create({ schema, execute, subscribe }, { server: httpServer, path: server.graphqlPath });

  httpServer.listen({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));
};

startApolloServer();
