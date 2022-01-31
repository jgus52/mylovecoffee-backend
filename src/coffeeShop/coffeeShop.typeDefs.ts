import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
    coffeeShopId: Int
  }
  type CoffeeShop {
    id: Int!
    name: String!
    address: String!
    content: String!
    userId: Int!
    user: User
    photos: [CoffeeShopPhoto]
    category: Category
  }
  type Category {
    id: Int
    name: String
    shops: [CoffeeShop]
    totalShops: Int
  }
`;
