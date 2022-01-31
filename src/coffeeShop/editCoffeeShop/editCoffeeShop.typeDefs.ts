import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShop(
      coffeeShopId: Int!
      name: String
      address: String
      category: String
      content: String
    ): mutationResult
  }
`;
