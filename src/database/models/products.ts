import { sequelize } from '../sequelize';
import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Users } from './Users';

class Products extends Model<InferAttributes<Products>, InferCreationAttributes<Products>> {
    
  declare id: CreationOptional<number>;

  declare name: string;

  declare price: number;

  declare quantity: number;

  declare description: string;

  declare size: string;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER().UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    createdAt: DataTypes.DATE(),
    updatedAt: DataTypes.DATE()
  },

  {
    tableName: 'products',
    timestamps: false,
    sequelize
  }
);

export { Products };
