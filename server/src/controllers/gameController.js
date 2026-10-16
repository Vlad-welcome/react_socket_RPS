import boardService from "../services/boardService.js";
import userService from "../services/userService.js";
import { Events } from "../../../packages/shared/socketEvents.js";

export const gameController = async (io, socket) => {
  socket.on(Events.ROOM, async (callback) => {
    console.log("Server Events.ROOM");
    const user = await userService.getBySocket(socket.id);
    const board = await boardService.create(user.id);
    callback({ boardId: board.id });
  });

  socket.on(Events.INVITE, async (name, boardId) => {
    console.log("Server Events.INVITE");
    const user = await userService.getByName(name);

    await boardService.join(boardId, user.id);

    //Пуш приглашённому игроку
    io.to(user.socketId).emit(Events.INVITED, {
      playerSocketId: socket.id,
      boardId: boardId,
    });
  });

  socket.on(Events.GAME_START, async (playerSocketId) => {
    console.log("Server Events.GAME_START");
    io.to(playerSocketId).emit(Events.GAME_STARTED, {
      start: true,
    });
  });
};
