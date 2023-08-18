import { sequelize } from '../sequelize';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';


// @ts-ignore
export type UsersAttributes = InferAttributes<Users>;

class Users extends Model<UsersAttributes, InferCreationAttributes<Users>> {

  declare id: CreationOptional<number>;

  declare username: string | null;

  declare walletId: string | null;

  declare email: string;

  declare phoneNum: CreationOptional<string> | null;

  declare password: string;
  
  declare status: CreationOptional<'unverified' | 'active' | 'suspended'>;

  declare emailVerifiedAt: CreationOptional<Date> | null;

  declare lastLoginAt: CreationOptional<Date> | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    walletId: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phoneNum: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('unverified', 'active', 'suspended'),
      defaultValue: 'unverified',
      allowNull: false
    },
    emailVerifiedAt: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    lastLoginAt: {
      type: DataTypes.DATE(),
      allowNull: true
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE()
  }, 
  {
    tableName: 'users',
    sequelize
  }
);

export { Users };
