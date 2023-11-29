export default interface RepositoryBase<T> {
  findAll(): Promise<T[]>;
  find(id: string): Promise<T>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
