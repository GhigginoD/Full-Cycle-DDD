import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "Customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: true })
  declare email: string;

  @Column
  declare active: boolean;

  @Column({ allowNull: false })
  declare rewardPoints: number;
}
