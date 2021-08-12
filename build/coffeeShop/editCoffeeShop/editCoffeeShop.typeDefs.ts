import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editCoffeeShop(coffeeShopId: Int!, name: String, latitude: String, longitude: String, category: String, photos: [Upload], deletePhotoIds: [Int]): mutationResult
  }
`;
