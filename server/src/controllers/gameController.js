import boardService from "../services/boardService.js";
import userService from "../services/userService.js";
import { Events } from "../../../packages/shared/socketEvents.js";

export const gameController = async (io, socket) => {
  socket.on(Events.ROOM, async (callback) => {
    console.log("Server Events.ROOM");
    const user = await userService.getBySocket(socket.id);
    const board = await boardService.create(user.id);
    callback({ id: board.id });
  });
};
