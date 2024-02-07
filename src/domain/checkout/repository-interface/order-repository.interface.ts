import RepositoryBase from "../../@shared/repository-interface/repository.interface";
import Order from "../entity/order";

export default interface OrderRepositoryInterface
  extends RepositoryBase<Order> {}
