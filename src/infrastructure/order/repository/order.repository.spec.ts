import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Order from "../../../domain/checkout/entity/order";
import Product from "../../../domain/product/entity/product";
import CustomerModel from "../../customer/repository/customer.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import ProductModel from "../../product/repository/product.model";
import ProductRepository from "../../product/repository/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
import OrderItem from "../../../domain/checkout/entity/orderItem";

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

  it("Should create a new Order", async () => {
    //Create a new customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Davi");
    await customerRepository.create(customer);

    // Create a new Product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", "", 249.99);
    await productRepository.create(product);

    //create a new Order
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );
    const order = new Order("1", customer.id);
    order.addItems([orderItem]);
    await orderRepository.create(order);
    const orderDB = await orderRepository.find(order.orderId);

    expect(orderDB).toEqual(order);
  });

  it("Should att and add +1 item in the order", async () => {
    // Create a new Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Davi");
    await customerRepository.create(customer);

    // Create a new Product
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", "", 250.0);
    const product2 = new Product("2", "Produto 2", "", 50.0);

    await productRepository.create(product);
    await productRepository.create(product2);

    // Create a new Order
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      1,
      product.id
    );
    const order = new Order("1", customer.id);
    order.addItems([orderItem]);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      1,
      product2.id
    );
    await orderRepository.create(order);
    order.addItems([orderItem2]);

    await orderRepository.update(order);
    const orderDB = await orderRepository.find(order.orderId);

    expect(orderDB).toEqual(order);
    expect(orderDB.items.length).toEqual(2);
    expect(orderDB.total()).toEqual(order.total());
  });

  it("Should return list of orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Davi", "davi@gmail.com");
    const customer2 = new Customer("2", "Victor", "victor@gmail.com");
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", "", 249.99);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id);
    const order2 = new Order("2", customer2.id);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersDB = await orderRepository.findAll();
    expect(ordersDB.length).toBe(2);
  });
});
