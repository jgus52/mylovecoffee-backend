import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User
    photos: [CoffeeShopPhoto]
    category: [Category]
  }
  type Category {
    id: Int
    name: String
    shops: [CoffeeShop]
    totalShops: Int
  }
`;