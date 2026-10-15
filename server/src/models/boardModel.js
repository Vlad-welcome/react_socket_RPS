import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./userModel.js";

export class Board extends Model {}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    userId_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "boards",
  },
);

User.hasMany(Board, { foreignKey: "userId_1", as: "BoardsAsPlayer1" });
Board.belongsTo(User, { foreignKey: "userId_1", as: "Player1" });

User.hasMany(Board, { foreignKey: "userId_2", as: "BoardsAsPlayer2" });
Board.belongsTo(User, { foreignKey: "userId_2", as: "Player2" });
