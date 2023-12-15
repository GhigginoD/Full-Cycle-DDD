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
    let product = new Product("1", "Produto 1", "", 249.99);
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );
    let customer = new Customer("1", "Davi");
    let order = new Order("1", customer.id);
    order.addItems([orderItem]);

    const orderRepository = new OrderRepository();
    orderRepository.create(order);
  });
});
