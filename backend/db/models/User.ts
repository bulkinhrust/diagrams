import bcrypt from 'bcrypt';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
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

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
