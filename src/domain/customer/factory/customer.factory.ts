import { v4 as uuid } from "uuid";
import { EventDispatcher } from "../../@shared/events/event-dispatcher";
import EventHandlerInterface from "../../@shared/events/event-handler.interface";
import { CustomerInterface } from "../customer.interface";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/customer-created-event";

export default class CustomerFactory {
  static create(name: string, email?: string): CustomerInterface {
    const customer = new Customer(uuid(), name, email);
    return customer;
  }

  static createWithLogger(
    name: string,
    events: EventHandlerInterface[]
  ): CustomerInterface {
    const customer = new Customer(uuid(), name);

    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    events.map((event) => {
      eventDispatcher.addEvent("CustomerCreatedEvent", event);
    });
    eventDispatcher.notify(customerCreatedEvent);
    return customer;
  }
}
