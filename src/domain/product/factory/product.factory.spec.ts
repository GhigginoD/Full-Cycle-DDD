import ProductFactory from "./product.factory";

describe("Product factory test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create(
      "a",
      "Product-1",
      "Produto numero 1",
      100
    );

    expect(product.id).toBeDefined();
    expect(product.price).toBe(100);
    expect(product.name).toBe("Product-1");
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create(
      "b",
      "Product",
      "Produto numero 2",
      150
    );

    expect(product.id).toBeDefined();
    expect(product.price).toBe(150);
    expect(product.name).toBe("Product-B");
    expect(product.constructor.name).toBe("ProductB");
  });
});
