import RepositoryBase from "../../@shared/repository-interface/repository.interface";
import Customer from "../entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryBase<Customer> {}
