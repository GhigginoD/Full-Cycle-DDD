import Customer from "../../../domain/customer/customer";
import CustomerRepositoryInterface from "../../../domain/customer/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async findAll(): Promise<Customer[]> {
    const listCustomer: Customer[] = [];
    const customers = await CustomerModel.findAll();

    customers.forEach((customer: CustomerModel) => {
      const c = new Customer(
        customer.id,
        customer.name,
        customer.email,
        customer.active,
        customer.rewardPoints
      );
      listCustomer.push(c);
    });

    return listCustomer;
  }
  async find(id: string): Promise<Customer> {
    let customerDB;
    try {
      customerDB = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (err) {
      throw new Error("Customer not found.");
    }
    return new Customer(customerDB.id, customerDB.name, customerDB.email);
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      rewardPoints: entity.rewardPoints,
      isActive: true,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        email: entity.email,
        rewardPoints: entity.rewardPoints,
        isActive: entity.active,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
