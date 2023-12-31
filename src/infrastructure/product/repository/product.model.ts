import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "Products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: true })
  declare description: string;

  @Column({ allowNull: false })
  declare price: number;
}
