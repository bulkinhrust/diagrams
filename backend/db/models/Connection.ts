import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey, HasMany, HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Diagram from './Diagram';
import Element from './Element';

@Table({
  timestamps: true,
  tableName: 'connections',
  modelName: 'Connection',
})

class Connection extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @ForeignKey(() => Diagram)
  @Column({
    type: DataType.INTEGER,
  })
  declare diagram_id: number;

  @Column({
    type: DataType.JSONB,
  })
  declare points: string;

  @Column({
    type: DataType.ENUM,
    values: ['arrow', 'line', 'dashArrow', 'dashLine'],
  })
  declare type: string;

  @ForeignKey(() => Element)
  @Column
  declare source_element: number;

  @ForeignKey(() => Element)
  @Column
  declare target_element: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

export default Connection;
