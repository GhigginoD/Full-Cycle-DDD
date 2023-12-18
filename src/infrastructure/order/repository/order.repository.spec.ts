import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/customer";
import Order from "../../../domain/order/order";
import OrderItem from "../../../domain/order/orderItem";
import Product from "../../../domain/product/product";
import CustomerModel from "../../customer/repository/customer.model";
import ProductModel from "../../product/repository/product.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new Order", () => {
    const product = new Product("1", "Produto 1", "", 249.99);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );
    const customer = new Customer("1", "Davi");
    const order = new Order("1", customer.id);
    order.addItems([orderItem]);

    const orderRepository = new OrderRepository();
    orderRepository.create(order);
  });

  it("Should add +1 item in the order", async () => {
    const product = new Product("1", "Produto 1", "", 250.0);
    const customer = new Customer("1", "Davi");
    const order = new Order("1", customer.id);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );
    order.addItems([orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const product2 = new Product("2", "Produto 2", "", 25.0);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      1,
      product2.id
    );
    order.addItems([orderItem2]);
    await orderRepository.update(order);
    const orderDB = await orderRepository.find(order.orderId);
    expect(orderDB.items.length).toEqual(2);
    expect(orderDB.total).toEqual(order.total());
  });
});
