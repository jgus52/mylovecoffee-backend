import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMyCoffeeShops(coffeeShopCursor: Int): [CoffeeShop]
  }
`;
