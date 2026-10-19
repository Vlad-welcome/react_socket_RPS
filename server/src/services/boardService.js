import { Board } from "../models/boardModel.js";

class boardService {
  async create(userId) {
    const board = await Board.create({ userId_1: userId });
    return board;
  }

  async join(boardId, userId) {
    const [affectedRows] = await Board.update({ userId_2: userId }, { where: { id: boardId } });
    return affectedRows > 0;
  }

  async delete(id) {
    const count = await Board.destroy({
      where: { id: id },
    });
    return count > 0;
  }
}

export default new boardService();
