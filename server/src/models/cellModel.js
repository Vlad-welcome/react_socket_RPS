import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Board } from "./boardModel.js";

export class Cell extends Model {}

Cell.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cellId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Board,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Cell",
    tableName: "cells",
  },
);

Board.hasMany(Cell, {
  foreignKey: "boardId",
});
Cell.belongsTo(Board, {
  foreignKey: "boardId",
});
