import { gql } from "apollo-server-express";

export default gql`
  type coffeeShopResult {
    ok: Boolean!
    error: String
    coffeeShopId: Int
  }
  type Mutation {
    createCoffeeShop(name: String!, latitude: String!, longitude: String!, category: String, photos: [Upload]): coffeeShopResult!
  }
`;
