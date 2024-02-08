import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import CustomerCreatedHandler, {
  CustomerCreatedHandler2,
} from "../event/handler/customer-created-handler";

export default class CustomerFactory {
  static create(name: string, email?: string): Customer {
    const customer = new Customer(uuid(), name, email);
    return customer;
  }

  static createWithLogger(name: string): Customer {
    const customer = new Customer(uuid(), name);
    const eventHandler = new CustomerCreatedHandler();
    const eventHandler2 = new CustomerCreatedHandler2();

    customer.addEvent("CustomerCreatedEvent", eventHandler);
    customer.addEvent("CustomerCreatedEvent", eventHandler2);

    return customer;
  }
}
