export default class Customer {
  private _id: string;
  private _name: string;
  private _email!: string;
  private _active: boolean;
  private _rewardPoints: number;
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = true;
    this._rewardPoints = 100;

    this.validate();
  }

  validate() {
    if (!this._id) throw new Error("Invalid customer id");
    if (!this._name) throw new Error("Invalid customer name");
  }

  changeStatus() {
    this._active = !this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
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
}
