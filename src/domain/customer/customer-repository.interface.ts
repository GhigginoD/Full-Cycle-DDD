import RepositoryBase from "../@shared/repository.interface";
import Customer from "./customer";

export default interface CustomerRepositoryInterface
  extends RepositoryBase<Customer> {}
