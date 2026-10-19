import { Cell } from "../models/cellModel.js";

class cellService {
  async create(boardId, id, icon) {
    const cell = await Cell.create({ cellId: id, boardId: boardId, icon: icon });
    return cell;
  }
}

export default new cellService();
