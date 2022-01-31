import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCoffeeShop(search: String!): [CoffeeShop]
  }
`;
