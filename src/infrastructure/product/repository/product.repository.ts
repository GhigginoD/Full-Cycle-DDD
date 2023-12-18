import Product from "../../../domain/product/product";
import ProductRepositoryInterface from "../../../domain/product/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async findAll(): Promise<Product[]> {
    const lstProducts: Product[] = [];
    const productDB = await ProductModel.findAll();
    productDB.forEach((product: ProductModel) => {
      const p = new Product(
        product.id,
        product.name,
        product.description,
        product.price
      );
      lstProducts.push(p);
    });
    return lstProducts;
  }

  async find(id: string): Promise<Product> {
    try {
      const productDB = await ProductModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
      return new Product(
        productDB.id,
        productDB.name,
        productDB.description,
        productDB.price
      );
    } catch (err) {
      throw new Error("Product not found");
    }
  }

  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        description: entity.description,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }
}
