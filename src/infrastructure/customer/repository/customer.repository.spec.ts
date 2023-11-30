import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/customer";
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
    const customer = new Customer("1", "davi");
    const customerRepository = new CustomerRepository();
    customerRepository.create(customer);
    const customerDB = await customerRepository.find("1");

    expect({
      id: customerDB.id,
      nome: customerDB.name,
      email: customerDB.email,
      points: customerDB.rewardPoints,
    }).toEqual({
      id: customer.id,
      nome: customer.name,
      email: customer.email,
      points: customer.rewardPoints,
    });
  });
});
