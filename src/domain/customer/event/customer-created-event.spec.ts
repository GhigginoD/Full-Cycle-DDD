import Address from "../entity/address";
import Customer from "../entity/customer";
import CustomerFactory from "../factory/customer.factory";
import { EventDispatcher } from "./../../@shared/events/event-dispatcher";
import CustomerCreatedEvent from "./customer-created-event";
import CustomerEditedAddressEvent from "./customer-edited-address-event";
import CustomerCreatedHandler, {
  CustomerCreatedHandler2,
} from "./handler/customer-created-handler";
describe("Customer event test", () => {
  it("Should register an event when created one customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedHandler();
    const eventHandler2 = new CustomerCreatedHandler2();
    const customerCreatedEvent = new CustomerCreatedEvent(
      new Customer("1", "Davi")
    );

    const spyEventHandler = jest.spyOn(eventHandler, "handler");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

    eventDispatcher.addEvent("CustomerCreatedEvent", eventHandler);
    eventDispatcher.addEvent("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should create a customer factory with events", () => {
    const customer = CustomerFactory.create("Davi");
    const address = new Address("Streat", 100, "100-345", "Rio de Janeiro");
    customer.changeAddress(address);

    const customerEditedAddressEvent = new CustomerEditedAddressEvent(customer);
    customer.notify(customerEditedAddressEvent);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Davi");
    expect(customer.active).toBe(true);
    expect(
      customer.getEventHandlers[customerEditedAddressEvent.constructor.name]
    ).toBeDefined();
    expect(
      customer.getEventHandlers[customerEditedAddressEvent.constructor.name]
        .length
    ).toBe(1);
  });
});
