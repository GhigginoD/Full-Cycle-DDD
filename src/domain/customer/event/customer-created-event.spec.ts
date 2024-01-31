import { EventDispatcher } from "./../../@shared/events/event-dispatcher";
import CustomerCreatedEvent from "./customer-created-event";
import AuditCustomerCreatedHandler, {
  AuditCustomerCreatedHandler2,
} from "./handler/audit-customer-created-handler";
describe("Customer event test", () => {
  it("Should register an event when created one customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new AuditCustomerCreatedHandler();
    const eventHandler2 = new AuditCustomerCreatedHandler2();
    const customerCreatedEvent = new CustomerCreatedEvent({});

    const spyEventHandler = jest.spyOn(eventHandler, "handler");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
