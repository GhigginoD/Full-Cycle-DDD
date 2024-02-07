import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer and find by id", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "davi");
    await customerRepository.create(customer);
    const customerDB = await customerRepository.find(customer.id);
    expect.assertions(1);
    expect({
      id: customerDB.id,
      nome: customerDB.name,
      points: customerDB.rewardPoints,
      active: customerDB.active,
    }).toEqual({
      id: customer.id,
      nome: customer.name,
      points: 100,
      active: customer.active,
    });
  });

  it("Should update customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Davi", "davi@gmail.com");
    await customerRepository.create(customer);

    customer.email = "davioliveira@gmail.com";
    customerRepository.update(customer);

    const customerBD = await customerRepository.find("1");
    expect.assertions(1);
    expect(customerBD.email).toEqual(customer.email);
  });

  it("Should throw error if find id does not exist", async () => {
    expect.assertions(1);
    expect(async () => {
      const customerRepository = new CustomerRepository();
      await customerRepository.find("123");
    }).rejects.toThrow("Customer not found.");
  });

  it("Should return more than 1 customer", async () => {
    const customer1 = new Customer("1", "Davi", "davi@gmail.com");
    const customer2 = new Customer("2", "Maria", "maria@gmail.com");

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);
    const lstCustomers = await customerRepository.findAll();

    expect(lstCustomers.length).toBe(2);
    expect(lstCustomers).toContainEqual(customer1);
    expect(lstCustomers).toContainEqual(customer2);
  });
});
