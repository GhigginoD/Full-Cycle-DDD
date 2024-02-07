import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

type TProduct = "a" | "b";

export default class ProductFactory {
  static create(
    type: TProduct,
    name: string,
    description: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, description, price);
      case "b":
        return new ProductB(uuid(), name, description, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
