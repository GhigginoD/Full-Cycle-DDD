export default class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this.validate();
  }

  validate() {
    if (!this._name) throw new Error("name is required");
    if (!this._quantity) throw new Error("quantity greater than 0");
  }
  total() {
    return this._price * this._quantity;
  }
}
