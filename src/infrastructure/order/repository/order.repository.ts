import Order from "../../../domain/order/order";
import OrderRepositoryInterface from "../../../domain/order/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
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
