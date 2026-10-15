import { Board } from "../models/boardModel.js";
import { User } from "../models/userModel.js";
import { sequelize } from "../config/db.js";

class boardService {
  async create(userId) {
    const board = await Board.create({ userId_1: userId });
    return board;
  }

  async join(boardId, userId) {
    const [affectedRows] = await Board.update({ userId_2: userId }, { where: { id: boardId } });
    return affectedRows > 0;
  }
}

export default new boardService();
