import { EventDispatcher } from "../../@shared/events/event-dispatcher";
import { CustomerInterface } from "../customer.interface";
import CustomerEditedAddressEvent from "../event/customer-edited-address-event";
import CustomerEditedAddressHandler from "../event/handler/customer-edited-address.handler";
import Address from "./address";

export default class Customer
  extends EventDispatcher
  implements CustomerInterface
{
  private _id: string;
  private _name: string;
  private _email: string | undefined;
  private _active: boolean;
  private _rewardPoints: number;
  private _address?: Address;

  constructor(
    id: string,
    name: string,
    email?: string,
    active?: boolean,
    rewardPoints?: number
  ) {
    super();
    this._id = id;
    this._name = name;
    this._active = active || true;
    this._rewardPoints = rewardPoints || 100;
    this._email = email;
    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Invalid customer id");
    if (!this._name) throw new Error("Invalid customer name");
  }

  changeStatus() {
    this._active = !this._active;
  }

  changeAddress(address: Address) {
    this._address = address;
    const customerEditedAddressEvent = new CustomerEditedAddressEvent(this);

    this.addEvent(
      customerEditedAddressEvent.constructor.name,
      new CustomerEditedAddressHandler()
    );
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
  set email(email: string) {
    this._email = email;
  }
  get rewardPoints() {
    return this._rewardPoints;
  }
  get active() {
    return this._active;
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get address() {
    return this._address;
  }
  get email(): string | undefined {
    return this._email;
  }
}
