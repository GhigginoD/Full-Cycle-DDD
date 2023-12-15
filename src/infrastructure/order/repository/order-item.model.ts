import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductModel from "../../product/repository/product.model";
import OrderModel from "./order.model";

@Table({
  tableName: "OrderItem",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;
}
