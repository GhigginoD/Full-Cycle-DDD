import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("Should throw error when you create a Customer", () => {
    expect(() => {
      new Customer("", "Davi");
    }).toThrow("Invalid customer id");

    expect(() => {
      new Customer("2", "");
    }).toThrow("Invalid customer name");
  });

  it("Should sucess when create a Customer", () => {
    const customer = new Customer("3", "Davi");
    expect(customer.name).toBe("Davi");
  });

  it("Should deactivate when the customer", () => {
    const customer = new Customer("1", "Davi");
    customer.changeStatus();
    expect(customer.active).toBe(false);
  });

  it("Should add rewards points to the customer", () => {
    const customer = new Customer("1", "Davi");
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(200);
  });
  it("Should dispatcher event when i edited address", () => {
    const customer = new Customer("1", "Davi");
    const address = new Address("street", 1, "20-32", "city");
    customer.changeAddress(address);

    expect(customer.id).toBeDefined();
    expect(customer.eventHandlers["CustomerEditedAddressEvent"]).toBeDefined();
    expect(customer.eventHandlers["CustomerEditedAddressEvent"].length).toBe(1);
  });
});
