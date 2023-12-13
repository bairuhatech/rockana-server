import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { SubCategory } from "../SUB_CATEGORY/sub_category.entity";
import { Products } from "../PRODUCTS/products.entity";

@Table({ tableName: "CATEGORY" })
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column(DataType.STRING)
  image: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => SubCategory)
  sub_categories: SubCategory[];

  @HasMany(() => Products)
  products: Products[];
}
