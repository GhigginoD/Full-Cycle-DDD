import RepositoryBase from "../../@shared/repository-interface/repository.interface";
import Product from "../entity/product";

export default interface ProductRepositoryInterface
  extends RepositoryBase<Product> {}
