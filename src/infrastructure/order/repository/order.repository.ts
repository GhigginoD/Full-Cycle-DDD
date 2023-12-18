import Order from "../../../domain/order/order";
import OrderRepositoryInterface from "../../../domain/order/order-repository.interface";
import OrderItem from "../../../domain/order/orderItem";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Order> {
    try {
      const orderDB = await OrderModel.findOne({
        where: { id: id },
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
          quantity: item.quantity,
          productId: item.productId,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
