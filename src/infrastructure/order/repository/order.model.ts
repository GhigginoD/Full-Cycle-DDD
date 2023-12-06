import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "../../customer/repository/customer.model";

@Table({
  tableName: "Orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @Column
  @PrimaryKey
  declare id: string;

  @Column({ allowNull: true })
  declare total: number;

  @Column
  @ForeignKey(() => CustomerModel)
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;
}
