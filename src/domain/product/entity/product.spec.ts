import Product from "./product";

describe("Products units tests", () => {
  it("Should throw error when create a product with id empty", () => {
    expect(() => {
      new Product("", "produto1", "", 20);
    }).toThrow("id is required");
  });
  it("Should throw error when create a product with name empty", () => {
    expect(() => {
      new Product("1", "", "", 20);
    }).toThrow("name is required");
  });
  it("Should throw error when create a product with less than 0", () => {
    expect(() => {
      new Product("1", "produto1", "", 0);
    }).toThrow("price should be greater than zero");
  });
  it("Should throw error when create a product with negative price", () => {
    expect(() => {
      new Product("1", "produto1", "", -50);
    }).toThrow("price should be greater than zero");
  });
});
