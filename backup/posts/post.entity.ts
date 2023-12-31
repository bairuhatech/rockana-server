import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Model,
  ForeignKey,
  Unique,
  Length,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./../user/user.entity";

@Table({
  tableName: "post",
})
export class Post extends Model<Post> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  _id: string;

  @Column
  userId: string;

  @Length({
    min: 3,
    max: 60,
    msg: `The length of post title can't be shorter than 3 and longer than 60 `,
  })
  @Column
  title: string;

  @Column
  content: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: "deleted_at" })
  deletedAt: Date;

  @BelongsTo(() => User)
  user: User;
}
