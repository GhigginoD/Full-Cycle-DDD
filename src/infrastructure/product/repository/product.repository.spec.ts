import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product Repository test", () => {
  let sequelize: Sequelize;
  let product = new Product(
    "1",
    "produto-1",
    "O mais vendido do brasil"!,
    100.0
  );

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    const productDB = await productRepository.find(product.id);
    expect(product).toEqual(productDB);
  });

  it("Should update product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
    product.price = 85;
    await productRepository.update(product);
    const productDB = await productRepository.find(product.id);

    expect(productDB.price).toBe(product.price);
  });

  it("Should throw error when product is not found", async () => {
    expect(async () => {
      const productRepository = new ProductRepository();
      await productRepository.find("123");
    }).rejects.toThrow("Product not found");
  });

  it("Should find many products", async () => {
    const productRepository = new ProductRepository();
    const product2 = new Product(
      "2",
      "Product-2",
      "O segundo melhor produto!",
      50
    );
    await productRepository.create(product);
    await productRepository.create(product2);
    const lstProducts = await productRepository.findAll();

    expect(lstProducts.length).toEqual(2);
    expect(lstProducts).toContainEqual(product);
    expect(lstProducts).toContainEqual(product2);
  });
});
