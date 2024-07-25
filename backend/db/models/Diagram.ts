import {
  Column, CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import User from './User';

@Table({
  timestamps: true,
  tableName: 'diagrams',
  modelName: 'Diagram',
})

class Diagram extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default Diagram;
