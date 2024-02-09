import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/customer-created-event";
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
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    customer.addEvent(customerCreatedEvent.constructor.name, eventHandler);
    customer.addEvent(customerCreatedEvent.constructor.name, eventHandler2);

    return customer;
  }
}
