import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCoffeeShop(coffeeShopId: Int!): CoffeeShop
  }
`;
