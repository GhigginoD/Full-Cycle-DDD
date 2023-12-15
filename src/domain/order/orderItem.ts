export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _total: number;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    productId: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productId = productId;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (!this._name) throw new Error("name is required");
    if (!this._quantity) throw new Error("quantity greater than 0");
  }
  total() {
    return this._price * this._quantity;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get quantity() {
    return this._quantity;
  }
  get productId() {
    return this._productId;
  }
}
