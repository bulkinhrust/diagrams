import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import Diagram from './Diagram';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})

class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.STRING)
  declare googleId: string;

  @Column(DataType.STRING)
  declare yandexId: string;

  @Default('USER')
  @Column(DataType.STRING)
  declare role: string;

  @Column(DataType.STRING)
  declare picture: string;

  @HasMany(() => Diagram)
  declare diagrams: Diagram[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

export default User;
