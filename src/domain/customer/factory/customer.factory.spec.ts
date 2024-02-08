import CustomerCreatedEvent from "../event/customer-created-event";
import CustomerFactory from "./customer.factory";

describe("Customer factory tests", () => {
  it("should create a customer factory with events", () => {
    const customer = CustomerFactory.createWithLogger("Davi");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    customer.notify(customerCreatedEvent);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Davi");
    expect(customer.active).toBe(true);
    expect(customer.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(customer.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
  });
  it("should create a customer factory", () => {
    const customer = CustomerFactory.create("Davi");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Davi");
    expect(customer.active).toBe(true);
  });
});
