import CustomerCreatedHandler, {
  CustomerCreatedHandler2,
} from "../event/handler/customer-created-handler";
import CustomerFactory from "./customer.factory";

describe("Customer factory tests", () => {
  it("should create a customer factory with events", () => {
    const eventHandler = new CustomerCreatedHandler();
    const eventHandler2 = new CustomerCreatedHandler2();
    const spyEventHandler = jest.spyOn(eventHandler, "handler");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handler");

    const customer = CustomerFactory.createWithLogger("Davi", [
      eventHandler,
      eventHandler2,
    ]);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Davi");
    expect(customer.active).toBe(true);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
  it("should create a customer factory", () => {
    const customer = CustomerFactory.create("Davi");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Davi");
    expect(customer.active).toBe(true);
  });
});
