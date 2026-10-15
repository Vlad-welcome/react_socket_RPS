import userService from "../services/userService.js";
import { Events } from "../../../packages/shared/socketEvents.js";

export const userController = (io, socket) => {
  socket.on(Events.JOIN, async (username, callback) => {
    console.log("Server Events.JOIN");
    if (!username?.trim()) return;
    await userService.add(username.trim(), socket.id);
  });

  socket.on("disconnect", async () => {
    console.log("Server disconnect");
    const user = await userService.getBySocket(socket.id);
    await userService.delete(user?.id);
  });
};
