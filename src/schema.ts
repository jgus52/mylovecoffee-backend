import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
