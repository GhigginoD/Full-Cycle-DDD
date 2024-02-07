import OrderItem from "./orderItem";

export default class Order {
  private _orderId: string;
  private _customerId: string;
  private _items!: OrderItem[];
  private _total: number;

  constructor(orderId: string, customerId: string) {
    this._orderId = orderId;
    this._customerId = customerId;
    this._total = 0;
    this._items = [];
    this.validate();
  }
  validate() {
    if (!this._orderId) throw new Error("id is required");
    if (!this._customerId) throw new Error("customerId is required");
  }

  addItems(items: OrderItem[]) {
    items.forEach((item) => this._items.push(item));
  }

  total() {
    return this._items.reduce((total, item): number => {
      return (total += item.total());
    }, 0);
  }

  get orderId() {
    return this._orderId;
  }
  get items() {
    return this._items;
  }
  get customerId() {
    return this._customerId;
  }
}
