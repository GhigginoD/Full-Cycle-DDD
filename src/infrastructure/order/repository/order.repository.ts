import Order from "../../../domain/order/order";
import OrderRepositoryInterface from "../../../domain/order/order-repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  create(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
