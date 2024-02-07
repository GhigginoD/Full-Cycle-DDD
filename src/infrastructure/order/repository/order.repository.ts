import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/orderItem";
import OrderRepositoryInterface from "../../../domain/checkout/repository-interface/order-repository.interface";

import ProductModel from "../../product/repository/product.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async findAll(): Promise<Order[]> {
    const ordersDB = await OrderModel.findAll({
      include: [{ model: OrderItemModel, include: [ProductModel] }],
    });
    const lstOrders: Order[] = [];
    ordersDB.forEach((orderDB) => {
      const order = new Order(orderDB.id, orderDB.customerId);
      const orderItens = orderDB.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product.name,
          item.price,
          item.quantity,
          item.productId
        );
      });
      order.addItems(orderItens);
      lstOrders.push(order);
    });
    return lstOrders;
  }

  async find(id: string): Promise<Order> {
    try {
      const orderDB = await OrderModel.findOne({
        where: { id: id },
        include: [{ model: OrderItemModel, include: [ProductModel] }],
        rejectOnEmpty: true,
      });
      const order = new Order(orderDB.id, orderDB.customerId);
      const orderItens = orderDB.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product.name,
          item.price,
          item.quantity,
          item.productId
        );
      });
      order.addItems(orderItens);
      return order;
    } catch (err) {
      throw new Error("Order not found");
    }
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.orderId,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({ where: { orderId: entity.orderId } });
    entity.items.forEach(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        orderId: entity.orderId,
        productId: item.productId,
        quantity: item.quantity,
      });
    });
  }
}
