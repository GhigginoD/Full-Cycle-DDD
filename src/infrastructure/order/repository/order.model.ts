import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "../../customer/repository/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "Orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: true })
  declare total: number;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
