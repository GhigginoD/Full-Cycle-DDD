export default class Product {
  private _id: string;
  private _name: string;
  private _description: string;
  private _price: number;

  constructor(id: string, name: string, description: string, price: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._price = price;
    this.validate();
  }
  validate() {
    if (!this._id) throw new Error("id is required");
    if (!this._name) throw new Error("name is required");
    if (this._price <= 0) throw new Error("price should be greater than zero");
  }
}
