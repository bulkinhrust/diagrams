import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey, HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Connection from './Connection';
import Diagram from './Diagram';

@Table({
  timestamps: true,
  tableName: 'elements',
  modelName: 'Element',
})

class Element extends Model {
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
    type: DataType.INTEGER,
  })
  declare x: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare y: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare width: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare height: number;

  @Column({
    type: DataType.ENUM,
    values: ['circle', 'triangle', 'rectangle'],
  })
  declare type: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasMany(() => Connection)
  declare connections: Connection[];

  // @BelongsTo(() => Connection)
  // declare connections: Connection[];
}

export default Element;
