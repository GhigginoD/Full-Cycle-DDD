import RepositoryBase from "../@shared/repository.interface";
import Product from "./product";

export default interface ProductRepositoryInterface
  extends RepositoryBase<Product> {}
