import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "DELIVERY_CHARGE" })
export class DeliveryCharge extends Model<DeliveryCharge> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  comparisonOperator: string;

  @Column(DataType.STRING)
  value: string;

  @Column(DataType.STRING)
  charge: string;
}
