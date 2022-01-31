import { gql } from "apollo-server-express";
import { FileUpload } from "graphql-upload";

export default gql`
  scalar Upload

  type coffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShopId: Int
    photos: [CoffeeShopPhoto]
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      address: String!
      category: String
      photos: [Upload]
      content: String
    ): coffeeShopResult!
  }
`;
