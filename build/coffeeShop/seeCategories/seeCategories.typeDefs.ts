import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeCategories(categoryCursor: Int): [Category]
  }
`;
