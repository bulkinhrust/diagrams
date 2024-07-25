import {
  Column, CreatedAt,
  DataType, HasMany,
  Model,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import Diagram from './Diagram';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})

class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'USER',
  })
  declare role: string;

  @HasMany(() => Diagram)
  declare diagrams: Diagram[];

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default User;
