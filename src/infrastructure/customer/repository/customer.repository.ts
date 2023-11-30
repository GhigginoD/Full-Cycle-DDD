import Customer from "../../../domain/customer/customer";
import CustomerRepositoryInterface from "../../../domain/customer/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Customer> {
    const customerDB = await CustomerModel.findOne({ where: { id: id } });
    return new Customer("1", "2");
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      rewardPoints: entity.rewardPoints,
      isActive: entity.active,
    });
  }

  update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
