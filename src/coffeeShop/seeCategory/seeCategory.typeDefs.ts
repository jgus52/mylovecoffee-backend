import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCategory(categoryId: Int!, coffeeShopCursor: Int): [CoffeeShop]
  }
`;
