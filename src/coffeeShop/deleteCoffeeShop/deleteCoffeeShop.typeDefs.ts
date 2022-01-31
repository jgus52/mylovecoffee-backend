import { gql } from "apollo-server-express";

export default gql`
  type deleteResult {
    ok: Boolean!
    error: String
    coffeeShopId: Int
  }
  type Mutation {
    deleteCoffeeShop(coffeeShopId: Int!): deleteResult
  }
`;
