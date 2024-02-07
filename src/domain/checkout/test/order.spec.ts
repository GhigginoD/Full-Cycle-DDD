import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

describe("Order unit test", () => {
  it("Should throw error when order id is empty", () => {
    expect(() => {
      new Order("", "Davi");
    }).toThrow("id is required");
  });

  it("Should throw error when order id is empty", () => {
    expect(() => {
      new Order("1", "");
    }).toThrow("customerId is required");
  });

  it("should throw error when quantity greater than 0", () => {
    expect(() => {
      new OrderItem("1", "product", 100, 0, "1");
    }).toThrow("quantity greater than 0");
  });
  it("should throw error when the name of item is empty", () => {
    expect(() => {
      new OrderItem("1", "", 100, 1, "1");
    }).toThrow("name is required");
  });

  it("Should calculate total order with 2 items", () => {
    const order = new Order("1", "Davi");
    const item = new OrderItem("item1", "product1", 100, 2, "1");
    const item2 = new OrderItem("item1", "product1", 50, 1, "2");
    order.addItems([item, item2]);
    expect(order.total()).toBe(250);
  });
});
