import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { User } from './userModel.js'

export class Message extends Model { }

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages'
});

User.hasMany(Message, {
  foreignKey: 'userId'
});
Message.belongsTo(User, {
  foreignKey: 'userId'
});